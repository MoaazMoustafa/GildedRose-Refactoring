class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  ageHasPassed(item){
    return item.sellIn < 0;
  }

  increaseQuality(item, number){
    item.quality = Math.min(item.quality + number, 50);
    return item;
  }
  decreaseQuality(item, number){
    item.quality = Math.max(item.quality - number, 0);
    return item;
  }

  updateBackStageQuality(item){
    if (item.sellIn > 10){
      this.increaseQuality(item, 1);
    }
    else if (10 >= item.sellIn && item.sellIn > 5){
      this.increaseQuality(item, 2);
    }
    else if (5 >= item.sellIn && item.sellIn > 0){
      this.increaseQuality(item, 3);
    }else {
      item.quality = 0;
    }
    return item;
  }
  refactoredUpdateQuality(){
     this.items.forEach((item)=>{
      if (item.name === 'Sulfuras, Hand of Ragnaros') return item;
      item.sellIn -= 1;
      if(item.name === 'Aged Brie') return this.increaseQuality(item, 1);
      if(item.name === 'Backstage passes to a TAFKAL80ETC concert') return this.updateBackStageQuality(item);
      if (this.ageHasPassed(item)){
        return this.decreaseQuality(item, 2);
      }else{
        return this.decreaseQuality(item, 1);
      }
    });

    return this.items;
  }
}
module.exports = {
  Item,
  Shop
}
