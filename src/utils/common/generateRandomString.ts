import * as crypto from "crypto"
export const generateRandomString = async (input: number): Promise<string> => {
    return await crypto.randomBytes(input).toString('hex');
}