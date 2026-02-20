
import os
import re
from playwright.sync_api import sync_playwright, expect

def verify_lead_form():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        try:
            # Navigate to home page
            print("Navigating to home page...")
            page.goto("http://localhost:3000/")
            page.wait_for_load_state("networkidle")

            # Take screenshot of home page
            os.makedirs("verification", exist_ok=True)
            page.screenshot(path="verification/home_page.png", full_page=True)
            print("Screenshot of home page taken.")

            # Locate the Lead Form
            print("Locating Lead Form...")
            # The form has a heading "Solution Inquiry"
            # Wait for it to be visible
            # expect(page.get_by_text("Solution Inquiry")).to_be_visible()
            # or wait for selector
            page.wait_for_selector("text=Solution Inquiry", timeout=10000)

            # Fill form with empty values first
            # Locate submit button
            submit_button = page.get_by_role("button", name="Request Technical Quotation")
            if not submit_button.is_visible():
                print("Submit button not found!")
                return

            # Try to submit empty form
            print("Submitting empty form...")
            submit_button.click()

            # Wait for JS to run validation
            page.wait_for_timeout(1000)

            # Take screenshot after submission
            page.screenshot(path="verification/after_submit.png", full_page=True)
            print("Screenshot after submission taken.")

            # Verify validation errors
            print("Verifying validation errors...")
            # Use strict matching if possible, or partial
            expect(page.get_by_text("Contact Name is required.")).to_be_visible()
            expect(page.get_by_text("Company Name is required.")).to_be_visible()
            expect(page.get_by_text("Business Email is required.")).to_be_visible()
            expect(page.get_by_text("Industry Sector is required.")).to_be_visible()
            expect(page.get_by_text("Project Scope is required.")).to_be_visible()

            # Verify visual cues (red border)
            name_input = page.locator("#contact-name")
            expect(name_input).to_have_class(re.compile(r"border-red-500"))

            print("Verification complete.")
        except Exception as e:
            print(f"Error: {e}")
            page.screenshot(path="verification/error_state.png", full_page=True)
            raise
        finally:
            browser.close()

if __name__ == "__main__":
    verify_lead_form()
