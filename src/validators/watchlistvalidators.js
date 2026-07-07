import { z } from "zod";


const addToWatchListSchema = z.object({

    movieId: z.string().uuid(),
    status: z.enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], { error: () => ({ message: "error in enum value" }) }).optional(),
    rating: z.coerce.number().int("rating must be an integer").min(1, "value must be between 1 and 10").max(10, "value must be between 1 and 10").optional(),
    notes: z.string().optional()
})

const updateListSchema = z.object({

    status: z.enum(["WATCHING", "COMPLETED", "DROPPED", "PLANNED"], "Status must be one of the following PLANNED,WATCHING,COOMPLETED,DROPPED").optional(),
    notes: z.string().optional(),
    rating: z.coerce.number().int("rating must be an integer").min(1, "value must be between 1 and 10").max(10, "value must be between 1 and 10")
})


export { addToWatchListSchema, updateListSchema };