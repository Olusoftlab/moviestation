


const validateRequest = (schema) => {

    return (req, res, next) => {

        const result = schema.safeParse(req.body)

        if (!result.success) {

            const formattedError = result.error?.format()

            const errorMessages = Object.values(formattedError).flat().filter(Boolean).map((err) => err._errors)

            console.log(errorMessages)

            res.status(400).json({ errorMessge: errorMessages.join(", ") })

        }

        next();


    }


}

export { validateRequest };