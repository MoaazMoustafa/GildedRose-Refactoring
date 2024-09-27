var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  it("Should check The Quality of an item is never negative ", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(0);
  });

  it("Should update the quality and the sellin ", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(19);
  });

  it("Should check if the sell by date has passed, Quality degrades twice as fast ", function () {
    const gildedRose = new Shop([new Item("+5 Dexterity Vest", 0, 20)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(18);
  });

  it("Should check The Quality of an item is never more than 50 ", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 10, 50)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(50);
  });


  it("Should check The Aged Brie actually increases in Quality the older it gets ", function () {
    const gildedRose = new Shop([new Item("Aged Brie", 20, 20)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(21);
  });
  it("Should check The Sulfuras, being a legendary item, never has to be sold or decreases in Quality", function () {
    const gildedRose = new Shop([new Item("Sulfuras, Hand of Ragnaros", 0, 80), new Item("Sulfuras, Hand of Ragnaros", -1, 80)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(80);
  });

  it("Should check The Backstage passes, like aged brie, increases in Quality as its SellIn value approaches", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(21);
  });

  it("Should check The Backstage passes, quality increases by 2 when there are 10 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(50);
  });

  it("Should check The Backstage passes, quality increases by  by 3 when there are 5 days or less", function () {
    const gildedRose = new Shop([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(49);
  });

  it("Should check The Conjured items degrade in Quality twice as fast as normal items", function () {
    const gildedRose = new Shop([new Item("Conjured Mana Cake", 3, 6)]);
    const items = gildedRose.refactoredUpdateQuality();
    expect(items[0].quality).to.equal(4);
  });
});
