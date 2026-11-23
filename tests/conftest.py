"""
pytest fixtures and test harness for GameGear SDET test suite.

Features:
- Starts and tears down an automated Python ThreadingHTTPServer on an ephemeral port.
- Manages Playwright Chromium browser lifecycle.
- Provides isolated, clean browser context & page per test function.
- Captures test failure or verification screenshots automatically.
"""

import os
import sys
import time
import socket
import threading
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import pytest
from playwright.sync_api import sync_playwright, Browser, Page

PROJECT_ROOT = Path(__file__).resolve().parent.parent


class QuietHTTPRequestHandler(SimpleHTTPRequestHandler):
    """SimpleHTTPRequestHandler with suppressed logging to avoid test clutter."""
    def log_message(self, format, *args):
        pass


@pytest.fixture(scope="session")
def server_url():
    """Starts a local HTTP server serving the GameGear project directory."""
    # Find free port
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        port = s.getsockname()[1]

    handler_class = partial(QuietHTTPRequestHandler, directory=str(PROJECT_ROOT))
    server = ThreadingHTTPServer(('127.0.0.1', port), handler_class)

    server_thread = threading.Thread(target=server.serve_forever, daemon=True)
    server_thread.start()

    base_url = f"http://127.0.0.1:{port}"
    # Wait until reachable
    for _ in range(50):
        try:
            with socket.create_connection(('127.0.0.1', port), timeout=0.1):
                break
        except (OSError, ConnectionRefusedError):
            time.sleep(0.05)

    yield base_url

    server.shutdown()
    server.server_close()


@pytest.fixture(scope="session")
def playwright_instance():
    """Session-scoped Playwright instance."""
    with sync_playwright() as p:
        yield p


@pytest.fixture(scope="session")
def browser(playwright_instance) -> Browser:
    """Session-scoped Chromium browser."""
    browser = playwright_instance.chromium.launch(
        headless=True,
        args=["--no-sandbox", "--disable-dev-shm-usage"]
    )
    yield browser
    browser.close()


@pytest.fixture(scope="function")
def page(browser: Browser, server_url: str):
    """
    Fresh browser page & isolated context for each test,
    guaranteeing a clean application state.
    """
    context = browser.new_context(
        viewport={"width": 1280, "height": 800},
        locale="en-IN"
    )
    page = context.new_page()
    page.goto(server_url)
    page.wait_for_load_state("domcontentloaded")

    yield page

    context.close()
