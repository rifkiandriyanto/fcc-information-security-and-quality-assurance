const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  test("Testing valid whole number input", (done) => {
    assert.strictEqual(
      convertHandler.getNum("2kg"),
      2,
      "Correctly read valid whole number input"
    );
    done();
  });
  test("Testing valid decimal input", (done) => {
    assert.strictEqual(
      convertHandler.getNum("2.5lbs"),
      2.5,
      "Correctly read valid decimal input"
    );
    done();
  });
  test("Testing valid fractional input", (done) => {
    assert.strictEqual(
      convertHandler.getNum("1/5kg"),
      0.2,
      "Correctly read valid fractional input"
    );
    done();
  });
  test("Testing valid fractional input with decimal", (done) => {
    assert.strictEqual(
      convertHandler.getNum("0.2/0.5kg"),
      0.4,
      "Correctly read valid fractional input with decimal"
    );
    done();
  });
  test("Testing invalid double fraction input", (done) => {
    assert.strictEqual(
      convertHandler.getNum("2/2/7kg"),
      "invalid number",
      "Return error for invalid double fraction input"
    );
    done();
  });
  test("Testing no numeric input", (done) => {
    assert.strictEqual(
      convertHandler.getNum("lbs"),
      1,
      "correctly default to 1 when no numeric input is provided"
    );
    done();
  });

  test("Testing valid input unit", (done) => {
    assert.strictEqual(
      convertHandler.getUnit("2gal"),
      "gal",
      "correctly read gal"
    );
    assert.strictEqual(convertHandler.getUnit("2L"), "L", "correctly read L");
    assert.strictEqual(
      convertHandler.getUnit("2mi"),
      "mi",
      "correctly read mi"
    );
    assert.strictEqual(
      convertHandler.getUnit("2km"),
      "km",
      "correctly read km"
    );
    assert.strictEqual(
      convertHandler.getUnit("2lbs"),
      "lbs",
      "correctly read lbs"
    );
    assert.strictEqual(
      convertHandler.getUnit("2kg"),
      "kg",
      "correctly read kg"
    );
    done();
  });

  test("Testing invalid input unit", (done) => {
    assert.strictEqual(
      convertHandler.getUnit("2invalidUnit"),
      "invalid unit",
      "Correctly return error message for invalid input unit"
    );
    done();
  });

  test("Testing return unit for valid input unit", (done) => {
    assert.strictEqual(
      convertHandler.getReturnUnit("gal"),
      "L",
      "Correctly return L as output unit for gal input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("L"),
      "gal",
      "Correctly return gal as output unit for L input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("mi"),
      "km",
      "Correctly return km as output unit for mi input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("km"),
      "mi",
      "Correctly return mi as output unit for km input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("lbs"),
      "kg",
      "Correctly return kg as output unit for lbs input unit"
    );
    assert.strictEqual(
      convertHandler.getReturnUnit("kg"),
      "lbs",
      "Correctly return lbs as output unit for kg input unit"
    );
    done();
  });

  test("Testing spelled-out string unit for valid input unit", (done) => {
    assert.strictEqual(
      convertHandler.spellOutUnit("GAL"),
      "gal",
      "Correctly return gal as output unit for GAL input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("l"),
      "L",
      "Correctly return L as output unit for l input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("MI"),
      "mi",
      "Correctly return mi as output unit for MI input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("KM"),
      "km",
      "Correctly return km as output unit for KM input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("LBS"),
      "lbs",
      "Correctly return lbs as output unit for LBS input unit"
    );
    assert.strictEqual(
      convertHandler.spellOutUnit("KG"),
      "kg",
      "Correctly return kg as output unit for KG input unit"
    );
    done();
  });

  test("Converting gal to L", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "gal"),
      7.57082,
      "Correctly convert 2gal to 7.57082L"
    );
    done();
  });
  test("Converting L to gal", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "L"),
      0.52834,
      "Correctly convert 2L to 0.52834gal"
    );
    done();
  });
  test("Converting mi to km", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "mi"),
      3.21868,
      "Correctly convert 2mi to 3.21868km"
    );
    done();
  });
  test("Converting km to mi", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "km"),
      1.24275,
      "Correctly convert 2km to 1.24275mi"
    );
    done();
  });
  test("Converting lbs to kg", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "lbs"),
      0.90718,
      "Correctly convert 2lbs to 0.90718kg"
    );
    done();
  });
  test("Converting kg to lbs", (done) => {
    assert.strictEqual(
      convertHandler.convert(2, "kg"),
      4.40925,
      "Correctly convert 2kg to 4.40925lbs"
    );
    done();
  });
});s