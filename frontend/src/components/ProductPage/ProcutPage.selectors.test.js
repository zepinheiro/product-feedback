import { createSelectRatingsFromData } from "./ProcutPage.selectors";

const REVIEWS = [
  {
    rating: 1,
  },
  { rating: 2 },
];

const CHANGED_REVIEWS = [
  {
    rating: 1,
  },
  { rating: 3 },
];

describe("createSelectRatingsFromData", () => {
  it("should return the same reference if the data is the same", () => {
    const selector = createSelectRatingsFromData();

    const res1 = selector(REVIEWS);
    const res2 = selector(REVIEWS);
    expect(res1 === res2).toBe(true);
  });

  it("should return other reference if the data changes", () => {
    const selector = createSelectRatingsFromData();

    const res1 = selector(REVIEWS);
    const res2 = selector(CHANGED_REVIEWS);
    expect(res1 === res2).toBe(false);
  });

  it("should transform the reviews into the correct format", () => {
    const selector = createSelectRatingsFromData();

    const res1 = selector(REVIEWS);

    expect(res1).toEqual({
      1: 1,
      2: 1,
      3: 0,
      4: 0,
      5: 0,
    });
  });
});
