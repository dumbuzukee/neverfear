import bcrypt from "bcryptjs";

export const generateSalt = async (rounds?: number) => {
    return await bcrypt.genSalt(rounds);
};

export const hashValue = async (value: string, salt?: number) => {
    return await bcrypt.hash(value, await generateSalt(salt));
};

export const compareValues = async (value: string, hashedValue: string) => {
    return await bcrypt.compare(value, hashedValue);
};