from playwright.sync_api import sync_playwright

def verify_solutions_page():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to Solutions page...")
            page.goto("http://localhost:3000/#/solutions")
            page.wait_for_load_state("networkidle")

            # Wait specifically for the first solution title to be visible
            page.wait_for_selector("text=Enterprise VMS")

            print("Checking first solution (Enterprise VMS)...")
            # Verify first solution (Enterprise VMS) has buttons
            # We can use locator chaining to find the solution card
            # The card has text "Enterprise VMS"
            # However, simpler is just to look for the button text globally since we know only one has it now.
            # But let's be precise.

            # Find the card container that contains "Enterprise VMS"
            # The structure is div.group -> ... -> h3: "Enterprise VMS"
            # We can use :has-text("Enterprise VMS")

            first_solution = page.locator("div.group").filter(has_text="Enterprise VMS").first

            manual_btn = first_solution.get_by_role("link", name="Download Manual")
            if manual_btn.is_visible():
                print("SUCCESS: Download Manual visible for Enterprise VMS")
            else:
                print("FAILURE: Download Manual NOT visible for Enterprise VMS")

            case_btn = first_solution.get_by_role("link", name="Case Studies")
            if case_btn.is_visible():
                print("SUCCESS: Case Studies visible for Enterprise VMS")
            else:
                print("FAILURE: Case Studies NOT visible for Enterprise VMS")

            print("Checking second solution (High-Performance Networking)...")
            # Verify second solution (High-Performance Networking) does NOT have buttons
            second_solution = page.locator("div.group").filter(has_text="High-Performance Networking").first

            manual_btn_2 = second_solution.get_by_role("link", name="Download Manual")
            if not manual_btn_2.is_visible():
                print("SUCCESS: Download Manual NOT visible for High-Performance Networking")
            else:
                print("FAILURE: Download Manual IS visible for High-Performance Networking")

            page.screenshot(path="verification/solutions_page.png", full_page=True)
            print("Screenshot saved to verification/solutions_page.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_solutions_page()
