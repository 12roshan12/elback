const mongoose = require('mongoose');

const trip_schema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    bannerImage: { type: String, required: true },
    tripImage: { type: String, required: true },
    video: { type: String, required: true },
    price: { type: String, required: true },
    isSpecialOffer: Boolean,
    offerPrice: String,
    summary: {
        duration: String,
        destination: String,
        startPoint: String,
        endPoint: String,
        groupSize: String,
        altitude: String,
        weather: String,
    },
    description: { type: String, required: true },
    itinerary: {
        description: { type: String, required: true },
        details: [
            {
                head: { type: String, required: true },
                headDetails: { type: String, required: true },
            }
        ]
    },
    inclusion: { type: [], required: true },
    exclusion: { type: [], required: true },
    aboutTrip: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    faq: [
        {
            head: { type: String },
            headDetails: { type: String },
        }
    ],
    customerReview: [
        {
            userid: String,
            username: String,
            rating: Number,
            comment: String
        }
    ],
    createdby: String,
    updatedby: String,
    createdon: { type: Date, default: Date.now() },
    updatedon: { type: Date, default: Date.now() }
})

const trip_model = mongoose.model('Trip', trip_schema)

const NewTripModel = (req) => {
    return new Promise(async (resolve, reject) => {

        if (req.body?.id == '') {
            delete req.body.id
            trip_table = new trip_model(req.body)
            trip_table.save((err, data) => {
                if (err) resolve({ status: 500, error: true, err: err })
                else resolve({ status: 200, error: null, data: data })
            })
        }
        else {
            trip_model.findByIdAndUpdate({ _id: req.body.id }, req.body, function (err, data) {
                if (err) { resolve({ status: 500, error: true, err: err }) }
                else {
                    if (data == null) {
                        resolve({ status: 400, error: true, err: 'Trip Not Found' })
                    }
                    else {
                        resolve({ status: 200, error: null, data: 'Trip Successfully Updated' })
                    }
                }
            })
        }

    })
}

const GetAllTripByIdModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.findById({_id:req.params.id}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}

const GetAllTripModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.find({}, function (err, data) {
            if (err) resolve({ status: 500, error: true, err: err })
            else resolve({ status: 200, error: null, data: data })
        })
    })
}


const TripDeleteModel = (req) => {
    return new Promise((resolve, reject) => {
        trip_model.deleteOne({ _id: req.params.id }, function (err, data) {
            if (err) { resolve({ status: 500, error: true, err: err }) }
            else {
                if (data.deletedCount == 0) {
                    resolve({ status: 400, error: true, err: "Trip Not Found" })
                }
                else {
                    resolve({ status: 200, error: null, data: "Trip Successfully  Deleted" })
                }
            }
        })
    })
}

module.exports = { NewTripModel, TripDeleteModel, GetAllTripModel,GetAllTripByIdModel }