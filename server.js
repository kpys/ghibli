const express = require('express')
const cors = require('cors')
const { request, response } = require('express')
const app = express()
const PORT = 8000 
const MongoClient = require('mongodb').MongoClient
const connectionString = 'mongodb+srv://ftw:XvSIjAzkfIARkHYd@ghibli-movies.nkxvqno.mongodb.net/?retryWrites=true&w=majority'

app.use(cors())
app.use(express.json())


const ghibliMovies ={
    "Nausicaä of the Valley of the Wind":{
        nameEn: "Nausicaä of the Valley of the Wind",
        nameJP: "風の谷のナウシカ",
        releaseDate: "11 March 1984",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/e/ea/Nausicaa_Of_The_Valley_of_The_Wind.jpg/revision/latest/scale-to-width-down/333?cb=20211031174237",
        director: "Hayao Miyazaki",
        runningTime: "117 minutes",
        summary: "Warrior and pacifist Princess Nausicaä desperately struggles to prevent two warring nations from destroying themselves and their dying planet."
    },
    "Castle in the Sky":{
        nameEn: "Castle in the Sky",
        nameJP: "天空の城ラピュタ",
        releaseDate: "August 2, 1986",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/c/c1/Castle_in_the_Sky.jpg/revision/latest/scale-to-width-down/350?cb=20210608122415",
        director: "Hayao Miyazaki",
        runningTime: "124 minutes",
        summary: "A young boy and a girl with a magic crystal must race against pirates and foreign agents in a search for a legendary floating castle."
    },
    "Grave of the Fireflies":{
        nameEn: "Grave of the Fireflies",
        nameJP: "火垂るの墓",
        releaseDate: "16 April 1988",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/6/6d/Grave_of_the_Fireflies_poster.jpg/revision/latest/scale-to-width-down/337?cb=20220126173445",
        director: "Isao Takahata",
        runningTime: "89 minutes",
        summary: "The story of Seita and Setsuko, two young Japanese siblings, living in the declining days of World War II. When an American firebombing separates the two children from their parents, the two siblings must rely completely on one another while they struggle to fight for their survival."
    },
    "My Neighbor Totoro":{
        nameEn: "My Neighbor Totoro",
        nameJP: "となりのトトロ",
        releaseDate: "16 April 1988",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/d/db/My_Neighbor_Totoro.jpg/revision/latest/scale-to-width-down/350?cb=20220121193631",
        director: "Hayao Miyazaki",
        runningTime: "86 minutes",
        summary: "When two girls move to the country to be near their ailing mother, they have adventures with the wondrous forest spirits who live nearby."
    },
    "Kiki's Delivery Service":{
        nameEn: "Kiki's Delivery Service",
        nameJP: "魔女の宅急便",
        releaseDate: "July 29, 1989",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/f/ff/Kiki%27s_Delivery_Service_English.jpg/revision/latest/scale-to-width-down/333?cb=20220413205802",
        director: "Hayao Miyazaki",
        runningTime: "103 minutes",
        summary: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service."
    },
    "Only Yesterday":{
        nameEn: "Only Yesterday",
        nameJP: "おもひでぽろぽろ",
        releaseDate: "July 20, 1991",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/a/a9/Only_Yesterday.jpg/revision/latest/scale-to-width-down/333?cb=20220212045636",
        director: "Isao Takahata",
        runningTime: "119 minutes",
        summary: "A twenty-seven-year-old office worker travels to the countryside while reminiscing about her childhood in Tokyo."
    },
    "Porco Rosso":{
        nameEn: "Porco Rosso",
        nameJP: "紅の豚",
        releaseDate: "July 18, 1992",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/4/41/Porco_Rosso.jpg/revision/latest/scale-to-width-down/333?cb=20220212051521",
        director: "Hayao Miyazaki",
        runningTime: "93 minutes",
        summary: "A young witch, on her mandatory year of independent life, finds fitting into a new community difficult while she supports herself by running an air courier service."
    },
    "Ocean Waves":{
        nameEn: "Ocean Waves",
        nameJP: "海がきこえる",
        releaseDate: "May 5, 1993",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/e/e1/Ocean_Waves_English.jpg/revision/latest/scale-to-width-down/333?cb=20220409211616",
        director: "Tomomi Mochizuki",
        runningTime: "72 minutes",
        summary: "As a young man returns home after his first year away at college he recalls his senior year of high school and the iron-willed, big city girl that turned his world upside down."
    },
    "Pom Poko":{
        nameEn: "Pom Poko",
        nameJP: "平成狸合戦ぽんぽこ",
        releaseDate: "July 16, 1994",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/7/77/Pom_Poko.png/revision/latest/scale-to-width-down/350?cb=20210708010255",
        director: "Isao Takahata",
        runningTime: "119 minutes",
        summary: "A community of magical shape-shifting raccoon dogs struggle to prevent their forest home from being destroyed by urban development."
    },
    "Whisper of the Heart":{
        nameEn: "Whisper of the Heart",
        nameJP: "耳をすませば",
        releaseDate: "July 15, 1995",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/7/7b/Whisper_of_the_Heart.jpg/revision/latest/scale-to-width-down/333?cb=20211108170234",
        director: "Yoshifumi Kondō",
        runningTime: "111 minutes",
        summary: "A love story between a girl who loves reading books, and a boy who has previously checked out all of the library books she chooses."
    },
    "Princess Mononoke":{
        nameEn: "Princess Mononoke",
        nameJP: "もののけ姫",
        releaseDate: "July 12, 1997",
        image: "img",
        director: "Hayao Miyazaki",
        runningTime: "133 minutes",
        summary: "On a journey to find the cure for a Tatarigami's curse, Ashitaka finds himself in the middle of a war between the forest gods and Tatara, a mining colony. In this quest he also meets San, the Mononoke Hime."
    },
    "My Neighbors the Yamadas":{
        nameEn: "My Neighbors the Yamadas",
        nameJP: "ホーホケキョとなりの山田くん",
        releaseDate: "17 July 1999",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/d/db/My_Neighbors_the_Yamadas.jpg/revision/latest/scale-to-width-down/333?cb=20220212045851",
        director: "Isao Takahata",
        runningTime: "103 minutes",
        summary: "The Yamadas are a typical middle class Japanese family in urban Tokyo and this film shows us a variety of episodes of their lives. With tales that range from the humourous to the heartbreaking, we see this family cope with life's little conflicts, problems and joys in their own way."
    },
    "Spirited Away":{
        nameEn: "Spirited Away",
        nameJP: "千と千尋の神隠し",
        releaseDate: "July 20, 2001",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/c/c5/Spirited_Away.jpg/revision/latest/scale-to-width-down/337?cb=20220121193910",
        director: "Hayao Miyazaki",
        runningTime: "124 minutes",
        summary: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches and spirits, a world where humans are changed into beasts."
    },
    "The Cat Returns":{
        nameEn: "The Cat Returns",
        nameJP: "猫の恩返し",
        releaseDate: "July 19, 2002",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/8/87/The_Cat_Returns.jpg/revision/latest/scale-to-width-down/333?cb=20211104164341",
        director: "Yoshifumi Kondō",
        runningTime: "111 minutes",
        summary: "A love story between a girl who loves reading books, and a boy who has previously checked out all of the library books she chooses."
    },
    "Howl's Moving Castle":{
        nameEn: "Howl's Moving Castle",
        nameJP: "ハウルの動く城",
        releaseDate: "November 20, 2004",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/0/08/Howl%27s_Moving_Castle.jpg/revision/latest/scale-to-width-down/333?cb=20220204191621",
        director: "Hayao Miyazaki",
        runningTime: "101 minutes",
        summary: "When an unconfident young woman is cursed with an old body by a spiteful witch, her only chance of breaking the spell lies with a self-indulgent yet insecure young wizard and his companions in his legged, walking castle."
    },
    "Tales from Earthsea":{
        nameEn: "Tales from Earthsea",
        nameJP: "ゲド戦記",
        releaseDate: "July 29, 2006",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/5/53/Tales_From_Earthsea.png/revision/latest/scale-to-width-down/333?cb=20220212050455",
        director: "Gorō Miyazaki",
        runningTime: "115 minutes",
        summary: "In a mythical land, a man and a young boy investigate a series of unusual occurrences."
    },
    "Ponyo":{
        nameEn: "Ponyo",
        nameJP: "崖の上のポニョ",
        releaseDate: "July 19, 2008",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/d/d2/Ponyo_Poster_English.jpg/revision/latest/scale-to-width-down/337?cb=20220413210709",
        director: "Hayao Miyazaki",
        runningTime: "101 minutes",
        summary: "A five-year-old boy develops a relationship with Ponyo, a young goldfish princess who longs to become a human after falling in love with him."
    },
    "The Secret World of Arrietty":{
        nameEn: "The Secret World of Arrietty",
        nameJP: "借りぐらしのアリエッティ",
        releaseDate: "July 17, 2010",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/f/f7/The_Secret_World_of_Arrietty.jpg/revision/latest/scale-to-width-down/333?cb=20210306220734",
        director: "Hiromasa Yonebayashi",
        runningTime: "94 minutes",
        summary: "The Clock family are four-inch-tall people who live anonymously in another family's residence, borrowing simple items to make their home. Life changes for the Clocks when their teenage daughter, Arrietty, is discovered."
    },
    "From Up on Poppy Hill":{
        nameEn: "From Up on Poppy Hill",
        nameJP: "コクリコ坂から",
        releaseDate: "July 16, 2011",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/d/dd/From_Up_On_Poppy_Hill.jpg/revision/latest/scale-to-width-down/350?cb=20220212051026",
        director: "Gorō Miyazaki",
        runningTime: "91 minutes",
        summary: "A group of Yokohama students fight to save their school's clubhouse from the wrecking ball during preparations for the 1964 Tokyo Olympic Games. While working there, Umi and Shun gradually attract each other, but face a sudden trial. Even so, they keep going without fleeing the difficulties of reality."
    },
    "The Wind Rises":{
        nameEn: "The Wind Rises",
        nameJP: "風立ちぬ",
        releaseDate: "July 20, 2013",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/2/2d/The_Wind_Rises.jpg/revision/latest/scale-to-width-down/333?cb=20220209132042",
        director: "Hayao Miyazaki",
        runningTime: "126 minutes",
        summary: "An aviation-obsessed engineer named Jirô Horikoshi has loved the aesthetics, spirit, and science of flight for as long as he can remember. For years he's been designing and building his dream plane, the Mitsubishi A6M Zero, and it's finally completed. But Jiro's dreams come crashing down when he learns, to his horror, that his creation will be used for combat in World War II.."
    },
    "The Tale of the Princess Kaguya":{
        nameEn: "The Tale of the Princess Kaguya",
        nameJP: "かぐや姫の物語",
        releaseDate: "November 23, 2013",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/8/87/The_Tale_of_the_Princess_Kaguya.jpg/revision/latest/scale-to-width-down/333?cb=20220414000919",
        director: "Isao Takahata",
        runningTime: "137 minutes",
        summary: "Found inside a shining stalk of bamboo by an old bamboo cutter and his wife, a tiny girl grows rapidly into an exquisite young lady. The mysterious young princess enthralls all who encounter her, but ultimately she must confront her fate, the punishment for her crime."
    },
    "When Marnie Was There":{
        nameEn: "When Marnie Was There",
        nameJP: "思い出のマーニー",
        releaseDate: "July 19, 2014",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/7/7c/When_Marnie_Was_There_-_English.jpg/revision/latest/scale-to-width-down/333?cb=20220409223902",
        director: "Hiromasa Yonebayashi",
        runningTime: "102 minutes",
        summary: "A 12-year-old girl is sent to the country for health reasons, where she meets an unlikely friend in the form of Marnie, a young girl with long, flowing blonde hair. As the friendship unravels it is possible that Marnie has closer ties to the protagonist than we might expect."
    },
    "Earwig and the Witch":{
        nameEn: "Earwig and the Witch",
        nameJP: "アーヤと魔女",
        releaseDate: "December 30, 2020",
        image: "https://static.wikia.nocookie.net/studio-ghibli/images/a/ac/Earwig_and_the_Witch.jpg/revision/latest/scale-to-width-down/333?cb=20220409222655",
        director: "Gorō Miyazaki",
        runningTime: "82 minutes",
        summary: "An orphan girl, Earwig, is adopted by a witch and comes home to a spooky house filled with mystery and magic."
    },
    "How Do You Live?":{
        nameEn: "How Do You Live?",
        nameJP: "君たちはどう生きるか",
        releaseDate: "July 14, 2023",
        image: "https://upload.wikimedia.org/wikipedia/en/4/41/How_Do_You_Live_poster.jpg",
        director: "Hayao Miyazaki",
        runningTime: "125 minutes",
        summary: "TBA"
    },

}

MongoClient.connect(connectionString)
    .then(client => {
        console.log(`Connected to Database`)
        const db = client.db('ghibli-movies')
        const infoColletction = db.collection('movies')

    app.get('/', (req,res) =>{
        res.sendFile(__dirname + '/index.html')
    })

    app.get('/api/:name', (req,res) => {
        const moviesName = req.params.name 
        infoColletction.find({nameEn: moviesName}).toArray()
        .then(results => {
            console.log(results)
            res.json(results[0])
        })
        .catch(error => console.error(error))
    })


})
.catch(error => console.error(error))






app.listen(process.env.PORT || PORT, () =>{
    console.log(`The server is running on port ${PORT}`)
})