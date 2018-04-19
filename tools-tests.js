Tinytest.add("HucTools.toWei", function(test) {
  // set BTC price
  HucTools.ticker.update("btc", {
    $set: {
      price: "0.01230"
    }
  });

  test.equal(HucTools.toWei(0.025, "btc"), "2032520325203252033");
  test.equal(HucTools.toWei(0.02554351, "btc"), "2076708130081300813");

  // set EUR price
  HucTools.ticker.update("eur", {
    $set: {
      price: "3.12344"
    }
  });

  test.equal(HucTools.toWei(6.247, "eur"), "2000038419178854084");
  test.equal(HucTools.toWei(6.24688, "eur"), "2000000000000000000");
  test.equal(
    HucTools.toWei("3.7481279999999999042", "eur"),
    "1199999999999999969"
  );
});

Tinytest.add("HucTools.formatNumber", function(test) {
  test.equal(
    HucTools.formatNumber("1000000000000000000", "0,0.0[00]"),
    "1,000,000,000,000,000,000.0"
  );
  test.equal(
    HucTools.formatNumber("11234565.4565432", "0,0.0[00]"),
    "11,234,565.457"
  );
});

Tinytest.add("HucTools.formatBalance", function(test) {
  // default to huc
  if (Meteor.isClient) HucTools.setUnit("huc");
  test.equal(
    HucTools.formatBalance("1000000000000000000", "0,0.0[00] unit"),
    "1.0 huc"
  );

  // default to finney
  if (Meteor.isClient) {
    HucTools.setUnit("finney");
    test.equal(
      HucTools.formatBalance("1000000000000000000", "0,0.0[00] unit"),
      "1,000.0 finney"
    );

    test.equal(
      HucTools.formatBalance("100000000000000000", "0,0.0[00] UNIT"),
      "100.0 FINNEY"
    );
  }

  test.equal(
    HucTools.formatBalance("1000000000000000000", "0,0.0[00] unit", "gwei"),
    "1,000,000,000.0 gwei"
  );

  test.equal(
    HucTools.formatBalance("112345676543212345", "0,0.0[00] UNIT", "gwei"),
    "112,345,676.543 GWEI"
  );

  test.equal(
    HucTools.formatBalance("112345676543212345", "0,0.0[0000]", "gwei"),
    "112,345,676.54321"
  );

  // set BTC price
  HucTools.ticker.update("btc", {
    $set: {
      price: "0.01230"
    }
  });

  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[00]", "btc"),
    "0.025"
  );
  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[00] unit", "btc"),
    "0.025 btc"
  );
  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[00]unit", "btc"),
    "0.025btc"
  );

  HucTools.ticker.update("btc", {
    $set: {
      price: "0.1"
    }
  });

  test.equal(
    HucTools.formatBalance(
      "1000000000000000000",
      "0,0.0000000000000000000",
      "btc"
    ),
    "0.1000000000000000056"
  );

  // set EUR price
  HucTools.ticker.update("eur", {
    $set: {
      price: "3.12344"
    }
  });

  test.equal(
    HucTools.formatBalance(
      "1200000000000000012",
      "0,0.0000000000000000000",
      "eur"
    ),
    "3.7481279999999999042"
  );
  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[00]", "eur"),
    "6.247"
  );
  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[00] UNIT", "eur"),
    "6.247 EUR"
  );
  test.equal(
    HucTools.formatBalance("2000000000000000000", "0,0.0[0000]UNIT", "eur"),
    "6.24688EUR"
  );

  HucTools.ticker.update("eur", {
    $set: {
      price: "1.00000"
    }
  });

  test.equal(
    HucTools.formatBalance(
      "1000000000000000000",
      "0,0.0000000000000000000",
      "eur"
    ),
    "1.0000000000000000000"
  );

  // reset
  if (Meteor.isClient) HucTools.setUnit("huc");
});
