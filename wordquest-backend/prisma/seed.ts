import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create Worlds
  const fantasy = await prisma.world.upsert({
    where: { slug: 'fantasy' },
    update: {},
    create: {
      name: 'Fantasy Kingdom',
      slug: 'fantasy',
      theme: 'fantasy',
      description: 'Dragons, spells & ancient scrolls',
      emoji: '🏰',
      color: '#a855f7',
    }
  })

  const space = await prisma.world.upsert({
    where: { slug: 'space' },
    update: {},
    create: {
      name: 'Space Exploration',
      slug: 'space',
      theme: 'space',
      description: 'Galaxies, planets & alien transmissions',
      emoji: '🚀',
      color: '#3b82f6',
    }
  })

  const timetravel = await prisma.world.upsert({
    where: { slug: 'timetravel' },
    update: {},
    create: {
      name: 'Time Travel',
      slug: 'timetravel',
      theme: 'timetravel',
      description: 'Jump through eras & solve history',
      emoji: '⏳',
      color: '#f59e0b',
    }
  })

  const cyberpunk = await prisma.world.upsert({
    where: { slug: 'cyberpunk' },
    update: {},
    create: {
      name: 'Cyberpunk City',
      slug: 'cyberpunk',
      theme: 'cyberpunk',
      description: 'Neon lights, hackers & dystopia',
      emoji: '🤖',
      color: '#10b981',
    }
  })

  const realstories = await prisma.world.upsert({
    where: { slug: 'realstories' },
    update: {},
    create: {
      name: 'Real Stories',
      slug: 'realstories',
      theme: 'realstories',
      description: 'Harshad Mehta, Enron & more',
      emoji: '📰',
      color: '#ef4444',
    }
  })

  console.log('✅ Worlds created!')

  // Create Words
  const word1 = await prisma.word.create({
    data: {
      word: 'Ephemeral',
      definition: 'Lasting for a very short time; transitory',
      pronunciation: 'eh-FEM-er-al',
      partOfSpeech: 'adjective',
      examples: [
        'The ephemeral beauty of cherry blossoms makes them precious.',
        'Fame can be ephemeral — here today, gone tomorrow.',
        'The wizard cast an ephemeral spell that faded at dawn.',
      ],
      etymology: 'From Greek "ephemeros" — epi (on) + hemera (day)',
      memoryTip: 'Think of "a day" — ephemeral things last only a day! 🌸',
      worldId: fantasy.id,
      date: new Date(),
    }
  })

  const word2 = await prisma.word.create({
    data: {
      word: 'Nebulous',
      definition: 'In the form of a cloud; hazy, vague or unclear',
      pronunciation: 'NEB-yoo-lus',
      partOfSpeech: 'adjective',
      examples: [
        'The alien signal was nebulous and hard to decode.',
        'His plans for the future were still nebulous.',
        'A nebulous cloud of gas surrounded the distant star.',
      ],
      etymology: 'From Latin "nebula" meaning cloud or mist',
      memoryTip: 'Nebula = cloud in space. Nebulous = cloudy and unclear! 🌌',
      worldId: space.id,
      date: new Date(Date.now() + 86400000),
    }
  })

  const word3 = await prisma.word.create({
    data: {
      word: 'Infamous',
      definition: 'Well known for some bad quality or deed',
      pronunciation: 'IN-fuh-mus',
      partOfSpeech: 'adjective',
      examples: [
        'Harshad Mehta became infamous for the 1992 securities scam.',
        'The infamous villain was feared across the kingdom.',
        'That street is infamous for its dangerous traffic.',
      ],
      etymology: 'From Latin "infamis" — in (not) + fama (fame)',
      memoryTip: 'Infamous = famous for the WRONG reasons! 📰',
      worldId: realstories.id,
      date: new Date(Date.now() + 172800000),
    }
  })

  console.log('✅ Words created!')

  // Create Chapters
  await prisma.chapter.create({
    data: {
      worldId: fantasy.id,
      wordId: word1.id,
      chapterNumber: 1,
      title: "The Dragon's Ephemeral Flame",
      storyText: `Deep in the Kingdom of Eldrath, the ancient dragon Korrax possessed a flame unlike any other. Unlike the eternal fires of lesser dragons, his was ephemeral — it would glow brilliantly for just one moment before vanishing into the cold mountain air.

The young wizard Aria had traveled for seven days to witness this ephemeral wonder. "Why does your flame last so briefly?" she asked.

Korrax smiled wisely. "Because the most beautiful things in life are ephemeral, child. A flame that burns forever holds no magic. It is the fleeting nature of my fire that makes it worth seeking."

Aria understood then — some of the most powerful spells in her grimoire were ephemeral too. They lasted only seconds, but in those seconds, they could change everything.`,
      isLocked: false,
    }
  })

  await prisma.chapter.create({
    data: {
      worldId: fantasy.id,
      wordId: word1.id,
      chapterNumber: 2,
      title: "The Ephemeral Crown",
      storyText: `The Kingdom of Eldrath had a secret — its crown was ephemeral. Every hundred years, it would dissolve into golden dust and reform on the head of the true heir.

King Malachar had worn the ephemeral crown for ninety-nine years. He knew his time was almost up. "Power is ephemeral," he told his daughter. "What lasts forever is how you used it."`,
      isLocked: true,
    }
  })

  await prisma.chapter.create({
    data: {
      worldId: space.id,
      wordId: word2.id,
      chapterNumber: 1,
      title: "The Nebulous Signal",
      storyText: `Commander Zara's ship had been tracking the nebulous signal for three weeks. It was unlike anything in the database — hazy, shifting, impossible to pin down.

"It could be a pulsar," said her co-pilot. "Or a nebulous energy field from a dying star."

But Zara knew better. The signal was too structured to be natural. Something — or someone — was sending a nebulous message from the edge of the galaxy, deliberately obscured so only the right crew could decode it.`,
      isLocked: false,
    }
  })

  await prisma.chapter.create({
    data: {
      worldId: realstories.id,
      wordId: word3.id,
      chapterNumber: 1,
      title: "The Infamous Scam of 1992",
      storyText: `In 1992, one man made the entire Indian stock market shake. Harshad Mehta — a stockbroker from Mumbai — became infamous overnight when investigators uncovered a securities scam worth ₹5,000 crore.

He was not always infamous. He started as a small-time broker with big dreams. But his methods became infamous: he exploited loopholes in the banking system to pump money into the stock market illegally.

The infamous Big Bull, as he was called, had fooled banks, investors and regulators alike. His story remains infamous to this day — a lesson in greed, ambition and the consequences of crossing the line.`,
      isLocked: false,
    }
  })

  console.log('✅ Chapters created!')
  console.log('🎉 Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })