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

  static create(item: Item) {
    switch (item.name) {
      case 'Aged Brie':
        return new AgedBrie(item);
      default:
        return new ItemWrapper(item);
    }
  }

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

/**
 * AgedBrie class represents an "Aged Brie" item and is a subclass of ItemWrapper.
 * It contains the logic for updating the quality and sellIn values of the "Aged Brie" item.
 *
 * @extends {ItemWrapper}
 */
class AgedBrie extends ItemWrapper {
  /**
   * Updates the quality and sellIn values of the "Aged Brie" item.
   * The quality increases by 1 (or 2 if the sellIn value is negative) up to a maximum of 50,
   * if we make these assumptions from the specification:
   * Once the sell by date (sellIn value) has passed, Quality degrades twice as fast for regular items.
   * Since "Aged Brie" behaves opposite to regular items, its quality increases twice as fast when the sellIn value is negative,
   *
   * The sellIn value decreases by 1.
   */
  updateQuality() {
    this.item.sellIn--;
    this.item.quality = Math.min(50, this.item.quality + (this.item.sellIn < 0 ? 2 : 1));
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
