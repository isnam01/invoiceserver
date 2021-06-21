
const Invoice = require('../models/invoice');
const Joi = require('joi');
const user = require('../models/user');
const depart = require('../models/depart');


function getCurrentFinancialYear() {
    var fiscalyear = "";
    var today = new Date();
    if ((today.getMonth() + 1) <= 3) {
        fiscalyear = (today.getFullYear() - 1) + "-" + today.getFullYear()
    } else {
        fiscalyear = today.getFullYear().toString().substr(-2) + "-" + ((today.getFullYear() + 1).toString().substr(-2))
    }
    return fiscalyear
}

module.exports.postinvoice = async (req, res) => {

    const invoiceSchema = Joi.object({
        customer: Joi.object({
            name: Joi.string().required(),
            number: Joi.number().required(),
            address: Joi.string().required(),
            email: Joi.string().required()
        }).required(),
        products: Joi.array().items(
            Joi.object({
                name: Joi.string(),
                rate: Joi.number(),
                quantity: Joi.number(),
                total: Joi.number()
            })
        ).required(),
        currency: Joi.string().required(),
        region: Joi.string().required(),
        points: Joi.string(),
        sgst: Joi.number(),
        gst: Joi.number(),
        igst: Joi.number(),
        subtotal: Joi.number().required(),
        total: Joi.number().required(),
        date: Joi.date().required(),
        duedate: Joi.date().required(),
    })
    try {
        await invoiceSchema.validateAsync(req.body);
        const department = await user.findOne({ _id: req.user }).select('-_id').select('department')
        const dep = await depart.findOne({ depart: department.department })
        dep.num = dep.num + 1
        await dep.save()
        console.log(dep)
        const num = dep.num
        const invoice = new Invoice(req.body)
        invoice.createdBy = req.user
        const year = getCurrentFinancialYear()
        invoice.invoiceNo = `${num}/${dep.depart}/${year}`
        invoice.status = "Pending"
        await invoice.save()
        console.log(invoice)
        if (!invoice) {
            return res.status(422).json({ error: "Unable to create invoice" })
        }
        else {
            return res.status(200).json({ message: "Successfully created Invoice" })
        }
    }
    catch (error) {
        if (error) {
            const msg = error.details.map(el => el.message).join(',')
            res.status(422).json({ error: msg })
            console.log(error)
        }

    }

}

module.exports.getinvoice = async (req, res) => {
    try {
        const invoices = await Invoice.find({ createdBy: req.user })
        return res.status(200).json({ invoices })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Some error has occured" })
    }
}

module.exports.delinvoice = (req, res) => {
    Invoice.findOneAndDelete({ _id: req.body.id })
        .then(() => {
            return res.status(200).json({ message: "Deleted Successfully" })
        }
        )
        .catch((err) => { console.log("error") })
}

module.exports.editinvoice = async (req, res) => {
    Invoice.findOneAndUpdate({ _id: req.body.id }, {
        $set: { status: req.body.status }
    })
        .then(() => {
            return res.status(200).json({ message: "Updated Successfully" })
        }
        )
        .catch((err) => { console.log("error") })
}
