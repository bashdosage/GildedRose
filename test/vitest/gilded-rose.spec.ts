import { beforeEach, describe, expect, it } from 'vitest';
import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe('foo');
  });
});

describe('When adding a new Aged Brie item to Gilded Rose', () => {
  describe('with initial SellIn value of 2 days and Quality value of 0', () => {
    let gildedRose;

    beforeEach(() => {
      // ARRANGE
      gildedRose = new GildedRose([new Item('Aged Brie', 2, 0)]);
    });

    describe('and one day passes', () => {
      it('should increase the quality to 1 and decrease the SellIn date to 1', () => {
        // ACT
        const updatedItems = gildedRose.updateQuality();

        // ASSERT
        expect(updatedItems[0].sellIn).toEqual(1);
        expect(updatedItems[0].quality).toEqual(1);
      });
    });

    describe('and two days pass', () => {
      it('should increase the quality to 2 and decrease the SellIn date to 0', () => {
        const days = 2;
        let updatedItems;

        // ACT
        for (let i = 0; i < days; i++) {
          updatedItems = gildedRose.updateQuality();
        }

        // ASSERT
        expect(updatedItems[0].sellIn).toEqual(0);
        expect(updatedItems[0].quality).toEqual(2);
      });
    });
  });
});

describe('When adding a new "Elixir of the Mongoose" item to Gilded Rose', () => {
  describe('with initial SellIn value of 5 days and Quality value of 7', () => {
    let gildedRose;

    beforeEach(() => {
      // ARRANGE
      gildedRose = new GildedRose([new Item('Elixir of the Mongoose', 5, 7)]);
    });

    describe('and one day passes', () => {
      it('should decrease the quality and SellIn date', () => {
        // ACT
        const updatedItems = gildedRose.updateQuality();

        // ASSERT
        expect(updatedItems[0].sellIn).toEqual(4);
        expect(updatedItems[0].quality).toEqual(6);
      });
    });
  });
});

describe('When having legendary items "Sulfuras, Hand of Ragnaros" in Gilded Rose', () => {
  it('should not decrease in quality nor have to be sold', () => {
    // ARRANGE
    const gildedRose = new GildedRose([new Item('Sulfuras, Hand of Ragnaros', 0, 80)]);

    // ACT
    const updatedItems = gildedRose.updateQuality();

    // ASSERT
    expect(updatedItems[0].sellIn).toEqual(0);
    expect(updatedItems[0].quality).toEqual(80);
  });
});

describe('When adding a new "Backstage passes to a TAFKAL80ETC concert" item to Gilded Rose', () => {
  describe('with initial SellIn value of 15 days and Quality value of 20', () => {
    let gildedRose;

    beforeEach(() => {
      // ARRANGE
      gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20)]);
    });

    describe('and one day passes', () => {
      it('should increase the quality by 1 and decrease the SellIn date by 1', () => {
        // ACT
        const updatedItems = gildedRose.updateQuality();

        // ASSERT
        expect(updatedItems[0].sellIn).toEqual(14);
        expect(updatedItems[0].quality).toEqual(21);
      });
    });
  });

  describe('and there are 10 days left', () => {
    it('should increase the quality by two and decrease the SellIn date by 1', () => {
      // ARRANGE
      const gildedRose = new GildedRose([new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)]);

      // ACT
      const updatedItems = gildedRose.updateQuality();

      // ASSERT
      expect(updatedItems[0].sellIn).toEqual(9);
      expect(updatedItems[0].quality).toEqual(22);
    });
  });
});
