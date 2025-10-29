import { prisma } from '../src/lib/prisma'

async function testConnection() {
  try {
    console.log('Testing database connection...')

    // Test the connection
    await prisma.$connect()
    console.log('✅ Successfully connected to the database!')

    // Get database info
    const result = await prisma.$queryRaw`SELECT version()`
    console.log('📊 Database info:', result)

    // Count tables
    const users = await prisma.user.count()
    const events = await prisma.event.count()
    const guests = await prisma.guest.count()
    const rsvps = await prisma.rSVP.count()

    console.log('\n📈 Database statistics:')
    console.log(`  Users: ${users}`)
    console.log(`  Events: ${events}`)
    console.log(`  Guests: ${guests}`)
    console.log(`  RSVPs: ${rsvps}`)

  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
    console.log('\n✅ Disconnected from database')
  }
}

testConnection()
