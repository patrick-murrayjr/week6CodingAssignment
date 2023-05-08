/**
 * Test Script for Week 6 Final Project
 * author: Patrick Murray
 *
 */
/*--------------------------------------------------------------------*/
/*
 *          YOU MUST 'npm install' IN YOUR TERMINAL TO INSTALL MOCHA/CHAI 
 *          FROM THE DEPENDENCIES IN YOUR PACKAGE.JSON
 * 
 *  Step 1: Create a describe code block that describes what you expect the code to do.
 *  Step 2: Copy/Paste your debugged code from week6Lab.js into the describe block (exclude the final console.log())
 *  Step 3: Create tests using expect/assert to test for expected outputs. Use multiple cases.
 *          If you're testing against an array/object - read the documentation on .deep/.deepEquals
 *
 *  Note:   Mocha/Chai is currently set up to only run in your given index.html. 
 *          expect/assert are given to you at the top of the code. 
 * 
 *          By default, the tests will pass unless you give it code to test against.
 * 
/*--------------------------------------------------------------------*/
//#region CARD CLASS
/**  Card Class
    Models a playing card.
    author: Patrick Murray

    Required arguments:
    - argument {String} rank - The Rank (face value) of the card
    - argument {String} suit - The Suit (Spades, Diamond, etc..) of the card.
    - argument {Number} pointValue - Used for comparing which card outranks another card.

*/
class Card {
   /*******************/
   /* Class Proprties */
   /* Private */
   #rank;
   #suit;
   #displayValue;
   #pointValue;

   /*****************/
   /* Class Methods */
   constructor(rank, suit, pointValue) {
      this.#rank = rank;
      this.#suit = suit;
      this.#displayValue = rank + suit;
      // Used for comparing which card outranks another
      this.#pointValue = pointValue;
   }

   //getRank -  returns the #rank(face value) of the card
   getRank() {
      return this.#rank;
   }

   //getSuit -  returns the suit(ex. C for Clubs, D for Diamonds) of the card
   getSuit() {
      return this.#suit;
   }

   //getDisplayValue -  returns the rank and suit of the card in the format Rank-Suit (ex. AS => Ace of Spades)
   getDisplayValue() {
      return this.#displayValue;
   }

   //getPointValue -  returns the point value assigned to the card used for comparing which card outranks another
   getPointValue() {
      return this.#pointValue;
   }
}
//#endregion CARD CLASS
//#region DECK CLASS
class Deck {
   /*******************/
   /* Class Proprties */
   /* private */
   #cardStack = [];
   #numRanks;
   #numSuits;

   /*****************/
   /* Class Methods */
   constructor() {
      this.#numRanks = 13;
      this.#numSuits = 4;
      this.resetDeck();
   }

   // resetDeck - Initialises and shuffles the deck. Should be called before every game starts.
   resetDeck() {
      this.#cardStack = [];
      this.initialiseDeck();
      this.shuffle();
   }

   // initialiseDeck - populates the deck with all 52 cards, 13 of each suit, in rank order
   // generates a Rank, Suit and PointValue for each card in the deck
   // shuffle() shoud be called after initialiseDeck.
   initialiseDeck() {
      let suit;
      for (let j = 0; j < this.#numSuits; j++) {
         switch (j) {
            case 0:
               suit = 'H';
               break;
            case 1:
               suit = 'C';
               break;
            case 2:
               suit = 'D';
               break;
            case 3:
               suit = 'S';
               break;
            default:
               break;
         }

         // Creates a new Card Object using (rank, suit, pointValue) and adds it to the cardStack
         for (let i = 0; i < this.#numRanks; i++) {
            switch (i) {
               case 0:
               case 1:
               case 2:
               case 3:
               case 4:
               case 5:
               case 6:
               case 7:
               case 8:
                  this.#cardStack.push(new Card(i + 2, suit, i + 2));
                  break;
               case 9:
                  this.#cardStack.push(new Card('J', suit, i + 2));
                  break;
               case 10:
                  this.#cardStack.push(new Card('Q', suit, i + 2));
                  break;
               case 11:
                  this.#cardStack.push(new Card('K', suit, i + 2));
                  break;
               case 12:
                  this.#cardStack.push(new Card('A', suit, i + 2));
                  break;
               default:
                  break;
            }
         }
      }
   }

   // shuffle - shuffles the cards in the deck
   // Iterates forward through the deck, the card at each index will be swapped
   // with a randomly chosen card until all cards have swapped at least once
   // shuffle() shoud be called after initialiseDeck.
   shuffle() {
      if (this.remainingCards() > 0) {
         let rndIndex;
         for (let i = 0; i < this.remainingCards(); i++) {
            rndIndex = Math.floor(Math.random() * this.remainingCards());
            this.#swap(i, rndIndex);
         }
      }
   }

   // swap - Private helper function used to swap cards during shufflling
   #swap(indexTo, indexFrom) {
      let tempCard = this.#cardStack[indexTo];
      this.#cardStack[indexTo] = this.#cardStack[indexFrom];
      this.#cardStack[indexFrom] = tempCard;
   }

   // dealCard - Deals the top card from the deck
   // returns a Card object
   dealCard() {
      if (this.remainingCards() > 0) {
         return this.#cardStack.pop();
      }
   }

   // remainingCards - Returns the number of cards remaining in the deck
   // returns a number
   remainingCards() {
      return this.#cardStack.length;
   }

   // showDeck - debugging function to display all cards in the deck
   showDeck() {
      for (let i = 0; i < this.remainingCards(); i++) {
         console.log(
            `Card: ${this.#cardStack[i].getDisplayValue()} ${this.#cardStack[
               i
            ].getPointValue()}`
         );
      }
   }

   // showTopCard - debugging function to display the top card in the deck
   showTopCard() {
      if (this.remainingCards() > 0) {
         console.log(
            `DTop: ${this.#cardStack[
               this.remainingCards() - 1
            ].getDisplayValue()}`
         );
      }
   }
}
//#endregion DECK CLASS
//#region PLAYER CLASS
/**  Player Class
    Class that models a player.
    author: Patrick Murray

*/
class Player {
   /*******************/
   /* Class Proprties */
   /* private */
   #cardStack = [];
   #score;

   /*****************/
   /* Class Methods */
   constructor() {
      this.resetPlayer();
   }

   // resetPlayer - Initialises a player by clearing all cards from the cardStack and sets score to 0
   // Should be called before every game starts.
   resetPlayer() {
      this.#cardStack = [];
      this.resetScore();
   }

   // addPoint - adds one point to the player's score
   addPoint() {
      this.#score++;
   }

   resetScore() {
      this.#score = 0;
   }

   // getScore - retrieves the player's current score
   // returns a number
   getScore() {
      return this.#score;
   }

   // drawCard - adds a card to the top of the player's card Stack
   drawCard(card) {
      this.#cardStack.push(card);
   }

   // playCard - plays the top card from the player's card Stack
   // returns a Card object
   playCard() {
      if (this.remainingCards() > 0) {
         return this.#cardStack.pop();
      }
   }

   // remainingCards - Returns the number of cards remaining in the player's stack
   // returns a number
   remainingCards() {
      return this.#cardStack.length;
   }

   // showStack - debugging function to display all cards in the player's stack
   showStack() {
      if (this.remainingCards() > 0) {
         for (let i = 0; i < this.remainingCards(); i++) {
            console.log(
               `Card: ${this.#cardStack[i].getDisplayValue()} ${this.#cardStack[
                  i
               ].getPointValue()}`
            );
         }
      }
   }

   // showTopCard - debugging function to display the top card in the player's stack
   showTopCard() {
      if (this.remainingCards() > 0) {
         console.log(
            `PTop: ${this.#cardStack[
               this.remainingCards() - 1
            ].getDisplayValue()}`
         );
      }
   }
}
//#endregion PLAYER CLASS
const expect = chai.expect;
const assert = chai.assert;

// create new player and deck for testing
const testPlayer = new Player();
const testDeck = new Deck();

describe('Deck Test Cases', () => {
   // Test Deck Methods
   describe('Initialise Deck and deal a Card', () => {
      it('#Should contain 52 cards when new Deck is created', () => {
         testDeck.resetDeck();
         console.log(`Deck remaining cards: ${testDeck.remainingCards()}`);
         expect(testDeck.remainingCards()).to.deep.equal(52);
      });

      it('#Should contain 51 cards after dealCard is called', () => {
         testDeck.dealCard();
         console.log(`Deck remaining cards: ${testDeck.remainingCards()}`);
         expect(testDeck.remainingCards()).to.deep.equal(51);
      });

      it('#Should contain 52 cards after resetDeck is called', () => {
         testDeck.resetDeck();
         console.log(`Deck remaining cards: ${testDeck.remainingCards()}`);
         expect(testDeck.remainingCards()).to.deep.equal(52);
      });
   });
});
describe('Player Test Cases', () => {
   // Test Player Score Methods
   describe('Initialise Player and add points', () => {
      it('#Should initialise the player score to 0', () => {
         console.log(`Player Score: ${testPlayer.getScore()}`);
         expect(testPlayer.getScore()).to.equal(0);
      });

      it('#Should add a point to score when addPoint called', () => {
         testPlayer.addPoint();
         console.log(`Player Score: ${testPlayer.getScore()}`);
         expect(testPlayer.getScore()).to.equal(1);
      });

      it('#Should reset the player score to 0 when resetPlayer is called', () => {
         testPlayer.resetPlayer();
         console.log(`Player Score: ${testPlayer.getScore()}`);
         expect(testPlayer.getScore()).to.equal(0);
      });
   });

   describe('Draw a Card to players hand and then Play the Card', () => {
      // Test Player Card Methods
      it('#Should have 0 cards in hand when new Player is created', () => {
         console.log(`Player remaining cards: ${testPlayer.remainingCards()}`);
         expect(testPlayer.remainingCards()).to.equal(0);
      });

      it('#Should have 1 card after calling drawCard', () => {
         testPlayer.drawCard(new Card('A', 'S', 14));
         console.log(`Player remaining cards: ${testPlayer.remainingCards()}`);
         expect(testPlayer.remainingCards()).to.equal(1);
      });

      it('#Should have 0 cards after calling playCard', () => {
         testPlayer.playCard();
         console.log(`Player remaining cards: ${testPlayer.remainingCards()}`);
         expect(testPlayer.remainingCards()).to.equal(0);
      });
   });
});
