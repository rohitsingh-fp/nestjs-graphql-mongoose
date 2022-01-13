
export const generateFutureDate = async(input: number): Promise<string|any> => {
      var fortnightAway = new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * input);
      return new Date(fortnightAway).toISOString();
}