'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import EventCard from '@/components/events/EventCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, Calendar, Sparkles } from 'lucide-react';
import { spacing, typography } from '@/lib/design-tokens';
import { mockEvents, eventCategories, EventCategory } from '@/lib/mock-events';

const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory | 'All'>('All');
  const [sortBy, setSortBy] = useState<'date' | 'popular'>('date');

  // Filter and sort events
  const filteredEvents = useMemo(() => {
    let filtered = [...mockEvents];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(query) ||
          event.description.toLowerCase().includes(query) ||
          event.location.city.toLowerCase().includes(query) ||
          event.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((event) => event.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy === 'date') {
      filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      filtered.sort((a, b) => b.attendeeCount - a.attendeeCount);
    }

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('date');
  };

  const hasActiveFilters = searchQuery || selectedCategory !== 'All' || sortBy !== 'date';

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 dark:from-orange-600 dark:via-orange-700 dark:to-orange-800 pt-32 pb-20 lg:pt-40 lg:pb-28 text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className={spacing.container}>
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center relative z-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/30"
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">Discover Amazing Events</span>
            </motion.div>

            <h1 className={`${typography.h1} mb-6 text-white`}>Browse Public Events</h1>
            <p className={`${typography.lead} text-orange-50 dark:text-orange-100 mb-8`}>
              Find and join exciting events happening in your community. From conferences to
              celebrations, there&apos;s something for everyone.
            </p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search events by name, location, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-12 h-14 text-base bg-white dark:bg-slate-800 dark:text-white dark:placeholder:text-gray-400 border-0 shadow-xl rounded-full focus-visible:ring-orange-300 dark:focus-visible:ring-orange-500"
                  aria-label="Search events"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-16 lg:top-20 z-40 shadow-sm dark:shadow-slate-900/50">
        <div className={spacing.container}>
          <div className="py-6">
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
              {/* Category Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
                <Filter className="h-5 w-5 text-gray-500 dark:text-gray-400 flex-shrink-0" aria-hidden="true" />
                <Button
                  variant={selectedCategory === 'All' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('All')}
                  className={
                    selectedCategory === 'All'
                      ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
                      : 'hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-700 dark:border-slate-700'
                  }
                >
                  All Events
                </Button>
                {eventCategories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 flex-shrink-0'
                        : 'hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-700 dark:border-slate-700 flex-shrink-0'
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className="text-sm text-gray-600 dark:text-gray-400 hidden sm:inline">Sort by:</span>
                <div className="flex gap-2">
                  <Button
                    variant={sortBy === 'date' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('date')}
                    className={
                      sortBy === 'date'
                        ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
                        : 'hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 dark:border-slate-700'
                    }
                  >
                    <Calendar className="h-4 w-4 mr-1.5" />
                    Date
                  </Button>
                  <Button
                    variant={sortBy === 'popular' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSortBy('popular')}
                    className={
                      sortBy === 'popular'
                        ? 'bg-orange-600 hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600'
                        : 'hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 dark:border-slate-700'
                    }
                  >
                    <Sparkles className="h-4 w-4 mr-1.5" />
                    Popular
                  </Button>
                </div>
              </div>
            </div>

            {/* Active Filters Display */}
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 flex flex-wrap items-center gap-2"
              >
                <span className="text-sm text-gray-600 dark:text-gray-400">Active filters:</span>
                {searchQuery && (
                  <Badge variant="secondary" className="gap-1.5 dark:bg-slate-800 dark:text-slate-300">
                    Search: {searchQuery}
                    <button
                      onClick={() => setSearchQuery('')}
                      className="ml-1 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-full p-0.5"
                      aria-label="Remove search filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {selectedCategory !== 'All' && (
                  <Badge variant="secondary" className="gap-1.5 dark:bg-slate-800 dark:text-slate-300">
                    {selectedCategory}
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className="ml-1 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-full p-0.5"
                      aria-label="Remove category filter"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {sortBy !== 'date' && (
                  <Badge variant="secondary" className="gap-1.5 dark:bg-slate-800 dark:text-slate-300">
                    Sort: Popular
                    <button
                      onClick={() => setSortBy('date')}
                      className="ml-1 hover:bg-gray-300 dark:hover:bg-slate-600 rounded-full p-0.5"
                      aria-label="Reset to date sorting"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 hover:bg-orange-50 dark:hover:bg-orange-950/50"
                >
                  Clear all
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className={`${spacing.section} flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950`}>
        <div className={spacing.container}>
          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600 dark:text-gray-400">
              Showing <span className="font-semibold text-gray-900 dark:text-white">{filteredEvents.length}</span>{' '}
              {filteredEvents.length === 1 ? 'event' : 'events'}
            </p>
          </div>

          {/* Events Grid */}
          {filteredEvents.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredEvents.map((event, index) => (
                <EventCard key={event.id} event={event} index={index} />
              ))}
            </div>
          ) : (
            // Empty State
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 mx-auto mb-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-orange-600 dark:text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No events found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
                We couldn&apos;t find any events matching your criteria. Try adjusting your filters
                or search terms.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="hover:bg-orange-50 dark:hover:bg-orange-950/50 hover:text-orange-700 dark:hover:text-orange-400 hover:border-orange-300 dark:hover:border-orange-700 dark:border-slate-700"
              >
                Clear all filters
              </Button>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EventsPage;
