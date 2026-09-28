-- ============================================================
-- Foster Paws seed data for DB to insert the six starter guides.
-- ============================================================

INSERT INTO guides
  (slug, title, short_description, image, difficulty, time_commitment, checklist, common_mistakes, pro_tip)
VALUES
  (
    'preparing-your-home',
    'Preparing Your Home',
    'Set up a safe, calm space before your foster arrives becuase a little prep goes a long way.',
    'home',
    'Beginner',
    '2 to 3 hours setup',
    ARRAY[
      'Pick a quiet room away from heavy foot traffic',
      'Remove cables, small objects, and toxic plants',
      'Set up a crate, bed, or cozy corner with a soft blanket',
      'Stock food, water bowls, and a few toys',
      'Have a vet''s number saved and a carrier or leash ready'
    ],
    ARRAY[
      'Giving the foster the run of the whole house on day one',
      'Buying too much gear before you know the animal''s needs',
      'Skipping a quiet decompression space'
    ],
    'Less is more on day one. A calm, small space helps your foster feel safe faster than a big, exciting house.'
  ),
  (
    'first-48-hours',
    'The First 48 Hours',
    'The decompression window. Your job is mostly to be calm, present, and patient.',
    'clock',
    'Beginner',
    'Ongoing for 2 days',
    ARRAY[
      'Keep introductions quiet and low-key',
      'Let the animal come to you but don''t force contact',
      'Offer food and water, but don''t stress if they don''t eat yet',
      'Watch for signs of stress: pacing, hiding, panting',
      'Stick to a simple routine: feed, potty, rest, repeat'
    ],
    ARRAY[
      'Inviting friends over to meet the new foster',
      'Expecting instant affection or playfulness',
      'Interpreting hiding as "they don''t like me"'
    ],
    'The 3-3-3 rule is your friend: 3 days to decompress, 3 weeks to settle, 3 months to feel at home. Day one is just the start.'
  ),
  (
    'feeding-and-nutrition',
    'Feeding & Nutrition',
    'What, when, and how much to feed as well as how to handle a picky or stressed eater.',
    'bowl',
    'Beginner',
    'Daily',
    ARRAY[
      'Ask the shelter what the animal was already eating',
      'Transition foods gradually over 5 to 7 days',
      'Feed at the same times each day to build routine',
      'Keep fresh water available at all times',
      'Measure portions because free-feeding can mask problems'
    ],
    ARRAY[
      'Switching foods abruptly (upset stomach guaranteed)',
      'Sharing table scraps, especially onions, garlic, chocolate, grapes',
      'Leaving food out all day for dogs since it hides appetite changes'
    ],
    'A sudden change in appetite is one of the earliest signals something''s off. Note it, and mention it to your vet or shelter contact.'
  ),
  (
    'vet-visits',
    'Vet Visits & Health Checks',
    'Most fosters come with a vet plan. Here''s how to make visits calm and useful.',
    'heart',
    'Beginner',
    '1–2 visits in the first month',
    ARRAY[
      'Confirm who covers vet costs between you or the shelter',
      'Bring any paperwork the shelter gave you',
      'Note any symptoms, appetite changes, or behavior shifts',
      'Ask about vaccines, deworming, and spay/neuter timing',
      'Keep a simple log of weight and eating habits'
    ],
    ARRAY[
      'Waiting too long to call about a concern',
      'Forgetting to mention behavior changes, not just physical ones',
      'Not asking who to call after hours'
    ],
    'Take a photo of the vet''s discharge instructions. You''ll thank yourself at 11pm when you can''t remember the dosage.'
  ),
  (
    'behavior-and-stress',
    'Managing Behavior & Stress',
    'Fosters often arrive scared, not "bad." Reading their signals makes all the difference.',
    'paw',
    'Intermediate',
    'Daily, ongoing',
    ARRAY[
      'Learn basic calming signals: lip licking, yawning, turning away',
      'Give the animal a safe retreat they can always access',
      'Use positive reinforcement such as treats, praise, gentle play',
      'Keep sessions short; end on a win',
      'Document patterns so you can share them with the shelter'
    ],
    ARRAY[
      'Punishing growls or hisses since they''re warnings, not aggression',
      'Forcing interaction when the animal is retreating',
      'Assuming behavior at week one is permanent'
    ],
    'A growl is a gift because it tells you the animal is uncomfortable before anything escalates. Never punish it. Listen to it.'
  ),
  (
    'saying-goodbye',
    'Saying Goodbye (The Happy Kind)',
    'The hardest and most beautiful part of fostering: handing them over to their forever home.',
    'sun',
    'Emotional',
    'One day and a lifetime of memory',
    ARRAY[
      'Ask the shelter how adoption day works ahead of time',
      'Write down everything you''ve learned about the animal',
      'Send favorite toys or a blanket with them',
      'Take one last photo because you''ll want it',
      'Give yourself permission to be sad and proud at once'
    ],
    ARRAY[
      'Not preparing emotionally for the handoff',
      'Forgetting to pass along quirks and preferences to the new family',
      'Thinking "I''m not cut out for this" when it hurts'
    ],
    'Foster grief is real and it''s a sign you did it right. Every goodbye makes room for the next animal who needs you.'
  )
ON CONFLICT (slug) DO NOTHING;