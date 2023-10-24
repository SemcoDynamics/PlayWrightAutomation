Feature: Ecommerce validations

  Scenario: Placing an order
    Given a login to Ecommerce application with username and password
    When select product Sauce Labs Onesie and add to cart
    Then verify that the CartBadge has one item in it
    When selecting the cart icon the correct product is in the mycart page
    Then Checkout your Information
    