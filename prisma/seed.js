import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/index.js"
import "dotenv/config"

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

const userId = "34de2273-36f1-4b1e-91fd-12dbdf34ab4a"

const movies = [

    {
        title: "hello wonderful",
        overview: "Two imprisoned men bon over a number of years",
        rate: 19,
        runtime: 456,
        releaseYear: 2009,
        genres: ["drama"],
        createdBy: userId
    }
    ,

    {
        title: "Super hero",
        overview: "The main super hero",
        rate: 18,
        runtime: 890,
        releaseYear: 1993,
        genres: ["drama", "action"],
        createdBy: userId
    }

    ,

    {
        title: "wonder woman",
        overview: "Two great wonder woman",
        rate: 18,
        runtime: 432,
        releaseYear: 1995,
        genres: ["drama", "action"],
        createdBy: userId
    }

    ,

    {
        title: "Batman gotham city",
        overview: "War in the gotham city, battle of supremacy",
        rate: 18,
        runtime: 245,
        releaseYear: 2026,
        genres: ["drama", "action", "comedy daram"],
        createdBy: userId
    }
    ,

    {
        title: "battle tank",
        overview: "two great army at war",
        rate: 18,
        runtime: 256,
        releaseYear: 1996,
        genres: ["drama", "action"],
        createdBy: userId
    }

]


const main = async () => {

    console.log("Seeding movies....")

    for (const movie of movies) {

        await prisma.movie.create({

            data: movie

        })

        console.log("Movi created ", `${movie.title}`)

    }

    console.log("Seeding completed")

}


// catch error

main().catch((err) => {

    console.error(err)
    process.exit(1)
}).finally(async () => {

    await prisma.$disconnect()

})