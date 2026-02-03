from time import sleep
from selenium.webdriver.common.by import By
import pytest
from selenium.webdriver import Chrome, Keys, ActionChains

@pytest.mark.parametrize(
    ("inp,expected"),
    [
        ("Other file.md", "££VeryRecognisableContent££"),
        ("gfdgfdsgfdsgfds", "Error: File not found: gfdgfdsgfdsgfds"),
        ("README", "Cannot recursively include self"),
    ],
    ids=[
        "Valid markdown files should embed",
        "Invalid files should error",
        "Recursive includes should be blocked",
    ]
)
def test_text_file_embedding(obsidian: Chrome, inp, expected):
    ActionChains(obsidian) \
        .key_down(Keys.CONTROL) \
        .send_keys("o") \
        .key_up(Keys.CONTROL) \
        .send_keys("README") \
        .send_keys(Keys.ENTER) \
        .perform()

    content_container = obsidian.find_element(
        By.CLASS_NAME,
        "cm-active"
    )
    content_container.send_keys(f"\n```inline-canvas\n{inp}")
    ActionChains(obsidian) \
        .send_keys(Keys.ARROW_RIGHT) \
        .send_keys(Keys.ARROW_RIGHT) \
        .send_keys(Keys.ARROW_RIGHT) \
        .send_keys(Keys.ARROW_RIGHT) \
        .send_keys(Keys.ENTER) \
        .perform()
    obsidian.find_element(
        By.XPATH,
        f"//*[contains(text(), '{expected}')]"
    )
