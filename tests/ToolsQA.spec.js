const {test, expect} = require('@playwright/test');


test("Elements", async ({page}) => {

    await page.goto("https://demoqa.com/");
    await page.locator(".card.mt-4.top-card").nth(0).click();
})

test("Text Box", async ({page}) => {
    
    await page.goto('https://demoqa.com/elements');
    //The $$ methond finds the elements matching and then is stored in a variable using [...listItems]
    const listItems = await page.$$('.left-pannel .accordion .element-group ul li');
    const listItemArray = [...listItems]

    //The for loop finds the text using innerText function then clicks the elements onces its found.
    for(const listItem of listItemArray) {
        const text = await listItem.innerText();
        if(text === 'Text Box'){
            await listItem.click();
            console.log('Found the item!');
            break;
        }
    }

    await page.locator('input#userName').fill("Testname");
    await page.fill('input#userEmail', 'apples@pears.org');
    await page.fill('#currentAddress', '123 apple drive hodor place denmark');
    await page.fill('#permanentAddress', 'same as above');
    await page.click('button#submit', {delay:500});
    await page.waitForLoadState("networkidle");
    await expect(page.locator('#output .border')).toBeVisible();
    console.log(await page.locator('#output .border p').allTextContents());
});

test('Check Boxes', async ({page}) => {

    await page.goto('https://demoqa.com/checkbox');

    //Script variables
    

    //Select all checkboxes
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(0).check();
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(0).isChecked();
    await expect(page.locator('#result')).toBeVisible();
    const textAll = await page.locator('#result').innerText();
    console.log(textAll);
    //Deselect one of the checkboxes
    await page.locator('.check-box-tree-wrapper li button').nth(0).click();
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(1).uncheck();
    await page.locator('.check-box-tree-wrapper li button').nth(2).click();
    await page.waitForLoadState('networkidle');
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(4).uncheck();
    await page.locator('.check-box-tree-wrapper li button').nth(3).click();
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(4).uncheck();
    await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(5).uncheck();
    await expect(page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(6)).toBeChecked();
    console.log('VA checkbox is checked: ', await page.locator('.check-box-tree-wrapper li label .rct-checkbox').nth(6).isChecked())

    await expect(page.locator('#result')).toBeVisible();
    const text = await page.locator('#result').innerText();
    console.log(text);

});

test.only('Radio buttons', async ({page}) => {

    await page.goto('https://demoqa.com/radio-button');
    const radioselector = page.locator('div.custom-control.custom-radio.custom-control-inline');
    const successMsg = page.locator('p.mt-3');
    const noRadio = page.locator('div.custom-control.custom-radio.custom-control-inline #noRadio')

    await radioselector.nth(0).click();
    console.log(await successMsg.innerText());
    expect(await successMsg.innerText() === "You have selected NO ");
    await radioselector.nth(1).click();
    console.log(await successMsg.innerText());
    console.log('No radio button is disabled',await noRadio.isDisabled());
})