import featureModel from "../models/featureModel.js";// Adjust the path if necessary

// Create a new feature
export const createFeature = async (req, res) => {
    try {
        const feature = new featureModel(req.body);
        await feature.save();
        res.status(201).json(feature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// to get all the features 
export const getFeature = async (req, res) => {

    try {
        const features = await featureModel.find();
        res.status(200).json(features);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// Delete a feature by ID
export const deleteFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await featureModel.findByIdAndDelete(id);
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json({ message: 'Feature deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a feature by ID
export const updateFeature = async (req, res) => {
    try {
        const { id } = req.params;
        const feature = await featureModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!feature) {
            return res.status(404).json({ message: 'Feature not found' });
        }
        res.status(200).json(feature);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
