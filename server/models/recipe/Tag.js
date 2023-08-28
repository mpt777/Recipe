import mongoose from 'mongoose';

const tagSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

export async function namesToIds(tagNames) {
    let tags = []
    // Find or create tags and collect their IDs
    for (const tagName of tagNames) {
      let tag = await Tag.findOne({ name: tagName });
      if (!tag) {
        tag = await Tag.create({ name: tagName });
      }
      tags.push(tag._id);
    }
    return tags
}

export const Tag = mongoose.model('Tag', tagSchema);