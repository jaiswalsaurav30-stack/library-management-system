const express = require("express");

const {
    addMember,
    getMembers,
    getMemberById,
    updateMember,
    deleteMember
} = require("../controllers/memberController");

const router = express.Router();

// Add Member
router.post("/", addMember);

// Get All Members
router.get("/", getMembers);

// Get Single Member
router.get("/:id", getMemberById);

// Update Member
router.put("/:id", updateMember);

// Delete / Deactivate Member
router.delete("/:id", deleteMember);

module.exports = router;