import Case from '../models/Case.js';

export const getCases = async (req, res) => {
  try {
    const cases = await Case.find().populate('createdBy', 'username');
    res.json(cases);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getCaseById = async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id).populate('createdBy', 'username');
    if (!caseItem) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json(caseItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCase = async (req, res) => {
  const { title, date, description, location, witnesses, employees } = req.body;

  try {
    const newCase = new Case({
      title,
      date,
      description,
      location,
      witnesses,
      employees,
      createdBy: req.user.id
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCase = async (req, res) => {
  const { title, date, status, description, location, witnesses, employees } = req.body;

  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { title, date, status, description, location, witnesses, employees },
      { new: true }
    );

    if (!updatedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }

    res.json(updatedCase);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCase = async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) {
      return res.status(404).json({ message: 'Case not found' });
    }
    res.json({ message: 'Case deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};