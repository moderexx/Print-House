import { validate as validateAsync } from "class-validator";

/**
 * Fields are null, until we call the asynchronous validate
 */
export default class ValidableClass<T>{
    constructor(entity: T) {
        const validate = async() =>{
            
            Object.assign(this, entity)
            const validationResult = await validateAsync(this)

            if (validationResult.length) {
                throw new Error(validationResult.join())
            }
        }
        
        this.validate = validate
    }
    validate: ()=>Promise<void>
}