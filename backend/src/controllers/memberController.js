const Member = require("../models/Member");

// Add Member
const addMember = async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            address,
            membershipId
        } = req.body;

        // Check required fields
        if (
            !name ||
            !email ||
            !phone ||
            !address ||
            !membershipId
        ) {
            return res.status(400).json({
                message: "All member fields are required"
            });
        }

        // Check duplicate email
        const existingEmail = await Member.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "A member with this email already exists"
            });
        }

        // Check duplicate membership ID
        const existingMembership = await Member.findOne({
            membershipId
        });

        if (existingMembership) {
            return res.status(400).json({
                message: "Membership ID already exists"
            });
        }

        // Create member
        const member = await Member.create({
            name,
            email,
            phone,
            address,
            membershipId
        });

        res.status(201).json({
            message: "Member added successfully",
            member
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add member",
            error: error.message
        });
    }
};


// Get All Members
const getMembers = async (req, res) => {
    try {
        const members = await Member.find({
            isActive: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: members.length,
            members
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch members",
            error: error.message
        });
    }
};


// Get Single Member
const getMemberById = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findById(id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        res.status(200).json({
            member
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch member",
            error: error.message
        });
    }
};


// Update Member
const updateMember = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            phone,
            address,
            membershipId
        } = req.body;

        const member = await Member.findById(id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        // Check duplicate email
        if (email && email !== member.email) {
            const existingEmail = await Member.findOne({ email });

            if (existingEmail) {
                return res.status(400).json({
                    message: "A member with this email already exists"
                });
            }
        }

        // Check duplicate membership ID
        if (
            membershipId &&
            membershipId !== member.membershipId
        ) {
            const existingMembership = await Member.findOne({
                membershipId
            });

            if (existingMembership) {
                return res.status(400).json({
                    message: "Membership ID already exists"
                });
            }
        }

        if (name !== undefined) member.name = name;
        if (email !== undefined) member.email = email;
        if (phone !== undefined) member.phone = phone;
        if (address !== undefined) member.address = address;

        if (membershipId !== undefined) {
            member.membershipId = membershipId;
        }

        await member.save();

        res.status(200).json({
            message: "Member updated successfully",
            member
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update member",
            error: error.message
        });
    }
};


// Delete / Deactivate Member
const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Member.findById(id);

        if (!member) {
            return res.status(404).json({
                message: "Member not found"
            });
        }

        // Soft delete
        member.isActive = false;

        await member.save();

        res.status(200).json({
            message: "Member deactivated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate member",
            error: error.message
        });
    }
};


module.exports = {
    addMember,
    getMembers,
    getMemberById,
    updateMember,
    deleteMember
};