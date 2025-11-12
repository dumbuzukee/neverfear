import CodeModel, { CodeInsert } from "@/models/codes.model";

export abstract class CodeService {
    static create = async (data: CodeInsert) => {
        return await CodeModel
            .create(data);
    };
    static delete = async (codeId: string) => {
        return await CodeModel
            .findByIdAndDelete(codeId);
    };
    static getById = async (codeId: string) => {
        return await CodeModel
            .findById(codeId);
    };
    static getByCode = async (code: string) => {
        return await CodeModel
            .findOne({ code });
    };
}