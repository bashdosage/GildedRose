export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class ItemWrapper {
  constructor(protected item: Item) {}

  updateQuality() {
    if (this.item.name != 'Aged Brie' && this.item.name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (this.item.quality > 0) {
        if (this.item.name != 'Sulfuras, Hand of Ragnaros') {
          this.item.quality = this.item.quality - 1
        }
      }
    } else {
      if (this.item.quality < 50) {
        this.item.quality = this.item.quality + 1
        if (this.item.name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.item.sellIn < 11) {
            if (this.item.quality < 50) {
              this.item.quality = this.item.quality + 1
            }
          }
          if (this.item.sellIn < 6) {
            if (this.item.quality < 50) {
              this.item.quality = this.item.quality + 1
            }
          }
        }
      }
    }
    if (this.item.name != 'Sulfuras, Hand of Ragnaros') {
      this.item.sellIn = this.item.sellIn - 1;
    }
    if (this.item.sellIn < 0) {
      if (this.item.name != 'Aged Brie') {
        if (this.item.name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.item.quality > 0) {
            if (this.item.name != 'Sulfuras, Hand of Ragnaros') {
              this.item.quality = this.item.quality - 1
            }
          }
        } else {
          this.item.quality = this.item.quality - this.item.quality
        }
      } else {
        if (this.item.quality < 50) {
          this.item.quality = this.item.quality + 1
        }
      }
    }
  }

  getItem() {
    return this.item;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    const wrappedItems = this.items.map((item) => new ItemWrapper(item));
    wrappedItems.forEach((wrappedItem) => wrappedItem.updateQuality());
    return this.items;
  }
}
