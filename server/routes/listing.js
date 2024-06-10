const router = require("express").Router();
const multer = require("multer");
const Listing = require("../models/Listing");
const User = require("../models/User");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post("/create", upload.array("listingPhotos"), async (req, res) => {
    try {
        const {
            creator, category, type, streetAddress, aptSuite, city, state, country,
            guestCount, bedroomCount, bedCount, bathroomCount, resource, title,
            description, highlight, highlightDesc, price
        } = req.body;

        const listingPhotos = req.files;

        if (!listingPhotos || listingPhotos.length === 0) {
            return res.status(400).send("No file uploaded!");
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.path);

        const newListing = new Listing({
            creator,
            category: JSON.parse(category),
            type: JSON.parse(type),
            streetAddress,
            aptSuite,
            city,
            state,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            resource: JSON.parse(resource),
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price
        });

        await newListing.save();
        res.status(200).json(newListing);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to create Listing", error: err.message });
    }
});

router.get("/", async (req, res) => {
    const qCategory = req.query.category;
    try {
        let listings;
        if (qCategory) {
            listings = await Listing.find({ category: qCategory }).populate("creator");
        } else {
            listings = await Listing.find().populate("creator");
        }
        res.status(200).json(listings);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to fetch Listings", error: err.message });
    }
});

router.get("/search/:search", async (req,res)=>{
    const { search} = req.params;
    try{
        let listings = [];
        if(search === "all"){
            listings = await Listing.find().populate("creator");
        }
        else{
            listings = await Listing.find({
                $or:[
                    { category: {$regex: search, $options: "i"}},
                    { title: {$regex: search, $options: "i"}},
                ]
            }).populate("creator");
        }
        res.status(200).json(listings);
    }catch(err){
        res.status(404).json({message: "Fail to fetch litings",error: err.message});
    }
})

router.get("/:listingId", async (req, res) => {
    try {
        const { listingId } = req.params;
        const listing = await Listing.findById(listingId).populate("creator");
        if (!listing) {
            return res.status(404).json({ message: "Listing not found!" });
        }
        res.status(200).json(listing);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "Failed to fetch Listing", error: err.message });
    }
});

module.exports = router;
