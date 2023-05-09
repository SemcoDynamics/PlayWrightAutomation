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
})