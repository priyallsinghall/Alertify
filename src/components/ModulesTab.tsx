import { useState, useEffect } from 'react';
import { AlertTriangle, Droplets, Flame, Wind, Heart, Mountain, Sun, Snowflake, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ModuleDetailView } from './ModuleDetailView';
import { useProgress } from '../contexts/ProgressContext';

interface ModulesTabProps {
  onNavigateToQuiz?: (moduleId: string) => void;
}

export function ModulesTab({ onNavigateToQuiz }: ModulesTabProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const { markModuleViewed, moduleProgress } = useProgress();

  // Listen for module selection from HomeTab
  useEffect(() => {
    const handleSelectModule = (event: CustomEvent) => {
      const { moduleId } = event.detail;
      setSelectedModule(moduleId);
      markModuleViewed(moduleId);
    };

    window.addEventListener('selectModule', handleSelectModule as EventListener);
    return () => {
      window.removeEventListener('selectModule', handleSelectModule as EventListener);
    };
  }, [markModuleViewed]);

  const modules = [
    {
      id: 'earthquake',
      title: 'Earthquake',
      icon: AlertTriangle,
      color: 'bg-red-500',
      description: 'Seismic activity preparedness',
      completed: true,
      image: 'https://images.unsplash.com/photo-1708681097926-2505401227e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'flood',
      title: 'Flood',
      icon: Droplets,
      color: 'bg-blue-500',
      description: 'Water-related emergency response',
      completed: false,
      image: 'https://images.unsplash.com/photo-1657069343871-fd1476990d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGRpc2FzdGVyfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'fire',
      title: 'Fire',
      icon: Flame,
      color: 'bg-orange-500',
      description: 'Fire safety and evacuation',
      completed: true,
      image: 'https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'cyclone',
      title: 'Cyclone',
      icon: Wind,
      color: 'bg-gray-600',
      description: 'Hurricane and storm preparation',
      completed: false,
      image: 'https://images.unsplash.com/photo-1641933002369-1122e78d0b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwaHVycmljYW5lfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'pandemic',
      title: 'Pandemic',
      icon: Heart,
      color: 'bg-purple-500',
      description: 'Health emergency protocols',
      completed: true,
      image: 'https://images.unsplash.com/photo-1604161547272-167c2fd11c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5kZW1pYyUyMGNvdmlkJTIwbWFza3xlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'landslide',
      title: 'Landslide',
      icon: Mountain,
      color: 'bg-amber-600',
      description: 'Slope stability and geology',
      completed: false,
      image: 'https://images.unsplash.com/photo-1728723320952-56e1090e4e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYW5kc2xpZGUlMjBtb3VudGFpbnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'heatwave',
      title: 'Heatwave',
      icon: Sun,
      color: 'bg-yellow-500',
      description: 'Extreme temperature safety',
      completed: false,
      image: 'https://images.unsplash.com/photo-1687982122778-9a5883144dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGRlc2VydCUyMHN1bnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: 'avalanche',
      title: 'Avalanche',
      icon: Snowflake,
      color: 'bg-cyan-500',
      description: 'Snow and ice hazards',
      completed: false,
      image: 'https://images.unsplash.com/photo-1687982122778-9a5883144dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGRlc2VydCUyMHN1bnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];

  const moduleDetails = {
    earthquake: {
      id: 'earthquake',
      title: 'Earthquake',
      icon: AlertTriangle,
      color: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1708681097926-2505401227e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlYXJ0aHF1YWtlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Comprehensive guide to earthquake preparedness and safety',
      whatIs: 'An earthquake is the sudden shaking of the ground caused by the movement of tectonic plates beneath the Earth\'s surface. These movements release energy that travels through the Earth as seismic waves, causing the ground to shake.',
      causes: [
        'Movement of tectonic plates at fault lines',
        'Volcanic activity releasing pressure',
        'Human activities like mining or fracking',
        'Collapse of underground caverns or mines'
      ],
      dos: [
        'Drop to hands and knees immediately',
        'Take cover under a sturdy desk or table',
        'Hold on to your shelter and protect your head',
        'Stay where you are until shaking stops',
        'Move away from windows and heavy objects',
        'If outdoors, move to an open area'
      ],
      donts: [
        'Don\'t run outside during shaking',
        'Don\'t stand in doorways (outdated advice)',
        'Don\'t use elevators',
        'Don\'t light matches or candles after',
        'Don\'t enter damaged buildings',
        'Don\'t spread unverified information'
      ],
      beforeTips: [
        'Create an emergency kit with supplies for 72 hours',
        'Identify safe spots in each room of your home',
        'Secure heavy furniture and objects to walls',
        'Practice Drop, Cover, and Hold On drills',
        'Know how to turn off gas, water, and electricity',
        'Keep important documents in a safe place'
      ],
      duringTips: [
        'Drop, Cover, and Hold On immediately',
        'If in bed, stay there and cover your head',
        'If driving, pull over safely and stay in vehicle',
        'Protect yourself from falling debris',
        'Stay calm and don\'t panic',
        'Count to 60 after shaking stops before moving'
      ],
      afterTips: [
        'Check for injuries and provide first aid',
        'Inspect your home for damage',
        'Check for gas leaks, electrical damage, and water leaks',
        'Listen to emergency broadcasts for information',
        'Be prepared for aftershocks',
        'Only use phones for emergencies'
      ],
      facts: [
        'The Earth experiences over 1 million earthquakes per year',
        'Most earthquakes occur along the "Ring of Fire" around the Pacific Ocean',
        'A magnitude 2.0 earthquake can barely be felt, while 8.0+ can cause widespread destruction',
        'The deepest earthquake ever recorded was 467 miles below the surface',
        'Japan experiences about 1,500 earthquakes per year due to its location'
      ],
      preparednessLevel: 85
    },
    flood: {
      id: 'flood',
      title: 'Flood',
      icon: Droplets,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1657069343871-fd1476990d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG9vZCUyMGRpc2FzdGVyfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Essential flood safety and preparedness information',
      whatIs: 'A flood occurs when water overflows or soaks land that is normally dry. Floods can happen due to heavy rainfall, storm surge, dam failure, or rapid snowmelt, and they are among the most common and costly natural disasters.',
      causes: [
        'Heavy or prolonged rainfall exceeding ground absorption',
        'Storm surge from hurricanes or coastal storms',
        'River or stream overflow due to excessive water flow',
        'Dam or levee failure',
        'Rapid snowmelt combined with rainfall',
        'Poor drainage systems in urban areas'
      ],
      dos: [
        'Move to higher ground immediately when warned',
        'Listen to emergency broadcasts and follow evacuation orders',
        'Avoid walking or driving through flood water',
        'Turn off utilities if instructed to do so',
        'Keep emergency supplies ready',
        'Stay informed about weather conditions'
      ],
      donts: [
        'Don\'t drive through flooded roads or bridges',
        'Don\'t walk through moving water',
        'Don\'t ignore evacuation orders',
        'Don\'t return home until authorities say it\'s safe',
        'Don\'t use electrical appliances in wet areas',
        'Don\'t drink flood water or use it for cooking'
      ],
      beforeTips: [
        'Know your area\'s flood risk and evacuation routes',
        'Keep sandbags or flood barriers if in high-risk area',
        'Elevate utilities and important items above potential flood levels',
        'Create a family emergency plan with meeting points',
        'Keep emergency kit with water, food, and first aid supplies',
        'Consider flood insurance (requires 30-day waiting period)'
      ],
      duringTips: [
        'Monitor emergency broadcasts continuously',
        'Evacuate immediately if told to do so',
        'Move to the highest floor if trapped in building',
        'Signal for help from rooftop if necessary',
        'Avoid flood water - just 6 inches can knock you down',
        'Stay away from electrical lines and equipment'
      ],
      afterTips: [
        'Wait for official all-clear before returning home',
        'Check for structural damage before entering buildings',
        'Wear protective clothing when cleaning up',
        'Discard contaminated food and water',
        'Document damage with photos for insurance',
        'Be aware of ongoing dangers like weakened trees'
      ],
      facts: [
        'Floods are the most common natural disaster in the United States',
        'Just 1 inch of flood water can cause $25,000+ in damage to a home',
        'Flash floods can reach speeds of 30 mph and heights of 30 feet',
        '6 inches of moving water can knock down an adult',
        '12 inches of water can carry away a vehicle',
        'Most flood-related deaths occur in vehicles'
      ],
      preparednessLevel: 70
    },
    fire: {
      id: 'fire',
      title: 'Fire Safety',
      icon: Flame,
      color: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1639369488374-561b5486177d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXJlJTIwZGlzYXN0ZXJ8ZW58MXx8fHwxNzU3ODM1MDM3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Fire prevention, safety, and evacuation procedures',
      whatIs: 'Fires are rapid chemical reactions that produce heat, light, and various reaction products. They can spread quickly and pose serious threats to life and property, requiring immediate and proper response to ensure safety.',
      causes: [
        'Electrical malfunctions and overloaded circuits',
        'Unattended cooking and kitchen accidents',
        'Heating equipment and space heaters',
        'Smoking materials and careless disposal',
        'Faulty wiring and electrical equipment',
        'Lightning strikes and natural causes'
      ],
      dos: [
        'Install smoke detectors on every level of your home',
        'Test smoke detector batteries monthly',
        'Create and practice a fire escape plan',
        'Keep fire extinguishers in key locations',
        'Stay low when escaping through smoke',
        'Call 911 immediately when safe'
      ],
      donts: [
        'Don\'t ignore smoke detector beeps',
        'Don\'t use water on electrical or grease fires',
        'Don\'t open doors that are hot to touch',
        'Don\'t go back inside a burning building',
        'Don\'t leave cooking unattended',
        'Don\'t overload electrical outlets'
      ],
      beforeTips: [
        'Install smoke and carbon monoxide detectors',
        'Create a detailed evacuation plan with two exits',
        'Practice fire drills with all family members',
        'Keep fire extinguishers in kitchen, garage, and basement',
        'Clear debris from around your home',
        'Maintain heating systems and chimneys annually'
      ],
      duringTips: [
        'Get out immediately when alarm sounds',
        'Feel doors before opening - don\'t open if hot',
        'Crawl low under smoke to avoid toxic fumes',
        'Use stairs, never elevators',
        'Meet at predetermined meeting spot outside',
        'Call 911 once you\'re safely outside'
      ],
      afterTips: [
        'Don\'t enter building until fire department says it\'s safe',
        'Watch for structural damage and hot spots',
        'Contact insurance company to report damage',
        'Secure property to prevent further damage',
        'Keep receipts for emergency expenses',
        'Seek medical attention for any smoke inhalation'
      ],
      facts: [
        'House fires spread incredibly fast - you may have less than 2 minutes to escape',
        'Most fire deaths are caused by smoke inhalation, not burns',
        'Working smoke detectors reduce fire death risk by 50%',
        'Cooking is the leading cause of home fires (50% of cases)',
        'Space heaters account for 43% of home heating fire deaths',
        'Christmas trees cause an average of 210 home fires annually'
      ],
      preparednessLevel: 92
    },
    cyclone: {
      id: 'cyclone',
      title: 'Cyclone',
      icon: Wind,
      color: 'bg-gray-600',
      image: 'https://images.unsplash.com/photo-1641933002369-1122e78d0b47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWNsb25lJTIwaHVycmljYW5lfGVufDF8fHx8MTc1NzgzNTAzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Hurricane and storm preparation guide',
      whatIs: 'A cyclone is a large-scale air mass that rotates around a strong center of low atmospheric pressure. Cyclones are characterized by inward-spiraling winds that rotate about a zone of low pressure. In different regions, they are called hurricanes, typhoons, or tropical cyclones.',
      causes: [
        'Warm ocean waters (at least 26.5°C/80°F)',
        'Low atmospheric pressure systems',
        'Coriolis effect from Earth\'s rotation',
        'Minimal wind shear in upper atmosphere',
        'Convergence of trade winds near equator',
        'Atmospheric instability and thunderstorm activity'
      ],
      dos: [
        'Monitor weather reports and evacuation orders',
        'Secure outdoor furniture and loose objects',
        'Stock up on emergency supplies before the storm',
        'Know your evacuation routes and shelter locations',
        'Keep important documents in waterproof containers',
        'Fill bathtubs and containers with clean water'
      ],
      donts: [
        'Don\'t ignore evacuation orders from authorities',
        'Don\'t drive through flooded roads',
        'Don\'t use candles or open flames during power outages',
        'Don\'t go outside during the eye of the storm',
        'Don\'t use generators indoors',
        'Don\'t wait until the last minute to evacuate'
      ],
      beforeTips: [
        'Create a family evacuation plan with meeting points',
        'Trim trees and secure loose outdoor items',
        'Install storm shutters or board up windows',
        'Keep vehicles fueled and in good condition',
        'Charge all electronic devices and power banks',
        'Review insurance policies and document property'
      ],
      duringTips: [
        'Stay indoors and away from windows',
        'Use battery-powered radio for weather updates',
        'Avoid using electrical appliances during storms',
        'Stay in interior rooms on lowest floor',
        'Don\'t be fooled by the calm eye of the storm',
        'Listen to local emergency management officials'
      ],
      afterTips: [
        'Wait for official all-clear before going outside',
        'Watch for fallen power lines and debris',
        'Avoid flood waters - they may be contaminated',
        'Document damage with photos for insurance',
        'Check on neighbors and provide mutual aid',
        'Beware of carbon monoxide from generators'
      ],
      facts: [
        'Cyclones can have wind speeds exceeding 250 km/h (155 mph)',
        'The eye of a cyclone can be 20-50 km (12-31 miles) wide',
        'Hurricane season in Atlantic runs from June 1 to November 30',
        'Storm surge can reach heights of 6 meters (20 feet) or more',
        'A single cyclone can drop trillions of gallons of water',
        'Cyclones lose strength rapidly once they move over land'
      ],
      preparednessLevel: 65
    },
    pandemic: {
      id: 'pandemic',
      title: 'Pandemic',
      icon: Heart,
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1604161547272-167c2fd11c7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5kZW1pYyUyMGNvdmlkJTIwbWFza3xlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Health emergency protocols and preparedness',
      whatIs: 'A pandemic is a disease outbreak that spreads across large regions or worldwide and affects a substantial number of people. Pandemics occur when a new infectious disease emerges and spreads easily from person-to-person across multiple countries or continents.',
      causes: [
        'Emergence of new infectious pathogens (viruses, bacteria)',
        'Genetic mutations making diseases more transmissible',
        'Global travel facilitating rapid disease spread',
        'Dense urban populations and poor sanitation',
        'Zoonotic transmission from animals to humans',
        'Lack of immunity in population to new pathogens'
      ],
      dos: [
        'Practice good personal hygiene regularly',
        'Follow public health guidelines and recommendations',
        'Get vaccinated when vaccines are available',
        'Maintain physical distance during outbreaks',
        'Wear masks in crowded or high-risk areas',
        'Stay informed through reliable health sources'
      ],
      donts: [
        'Don\'t ignore public health recommendations',
        'Don\'t spread misinformation or unverified claims',
        'Don\'t panic buy or hoard essential supplies',
        'Don\'t stigmatize affected individuals or groups',
        'Don\'t travel to high-risk areas unnecessarily',
        'Don\'t neglect other health needs and conditions'
      ],
      beforeTips: [
        'Build emergency supplies including medications',
        'Stay up-to-date with routine vaccinations',
        'Develop work-from-home and remote learning plans',
        'Identify reliable health information sources',
        'Plan for care of vulnerable family members',
        'Strengthen immune system through healthy lifestyle'
      ],
      duringTips: [
        'Follow quarantine and isolation guidelines if needed',
        'Practice frequent handwashing with soap',
        'Avoid touching face with unwashed hands',
        'Maintain social connections while physically distancing',
        'Seek medical care early if symptoms develop',
        'Support community response and mutual aid efforts'
      ],
      afterTips: [
        'Continue preventive measures until officially cleared',
        'Address mental health impacts and seek support',
        'Gradually resume normal activities as advised',
        'Participate in recovery and rebuilding efforts',
        'Learn from experience to improve future preparedness',
        'Support research and healthcare system strengthening'
      ],
      facts: [
        'The 1918 flu pandemic infected one-third of the world\'s population',
        'Modern air travel can spread diseases globally within 24 hours',
        'Handwashing can reduce respiratory infections by 16-21%',
        'Vaccines have prevented an estimated 21 million deaths since 2000',
        'WHO monitors over 160 epidemic-prone diseases worldwide',
        'Social distancing can reduce transmission rates by 50-80%'
      ],
      preparednessLevel: 78
    },
    landslide: {
      id: 'landslide',
      title: 'Landslide',
      icon: Mountain,
      color: 'bg-amber-600',
      image: 'https://images.unsplash.com/photo-1728723320952-56e1090e4e4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfH58bGFuZHNsaWRlJTIwbW91bnRhaW58ZW58MXx8fHwxNzU3ODM1MDM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Slope stability and geological hazard awareness',
      whatIs: 'A landslide is the movement of rock, earth, or debris down a sloped section of land. Landslides are caused by rain, earthquakes, volcanoes, or other factors that make the slope unstable. They can be slow or fast, small or large, and can occur with little to no warning.',
      causes: [
        'Heavy rainfall saturating soil and rock',
        'Earthquakes triggering slope instability',
        'Volcanic activity and associated ground shaking',
        'Human activities like construction and mining',
        'Erosion weakening slope foundations',
        'Changes in groundwater levels and drainage'
      ],
      dos: [
        'Learn about landslide risk in your area',
        'Watch for changes in landscape and drainage patterns',
        'Install flexible pipe fittings to avoid gas leaks',
        'Plan evacuation routes away from slide paths',
        'Listen for unusual sounds like trees cracking',
        'Contact authorities if you notice signs of movement'
      ],
      donts: [
        'Don\'t build in landslide-prone areas',
        'Don\'t ignore small slides or ground cracks',
        'Don\'t remove vegetation from steep slopes',
        'Don\'t add water to slopes through irrigation',
        'Don\'t assume past stability means future safety',
        'Don\'t return to evacuated areas until cleared'
      ],
      beforeTips: [
        'Research landslide history in your area',
        'Install proper drainage around your property',
        'Maintain vegetation on slopes for stability',
        'Consider retaining walls for steep slopes',
        'Develop emergency plans for different scenarios',
        'Keep emergency supplies readily accessible'
      ],
      duringTips: [
        'Listen for rumbling sounds that might indicate debris flow',
        'Watch for rapid changes in creek or stream levels',
        'Be alert for tilting trees, poles, or other structures',
        'Move away from the slide path immediately if possible',
        'Curl into tight ball and protect head if caught',
        'Stay alert - landslides can occur repeatedly'
      ],
      afterTips: [
        'Stay away from slide area - additional slides possible',
        'Check for injured or trapped persons near slide',
        'Watch for flooding - slides can dam waterways',
        'Report broken utility lines to authorities',
        'Have property inspected by qualified expert',
        'Replant damaged slopes to reduce erosion'
      ],
      facts: [
        'Landslides cause 25-50 deaths annually in the US',
        'They cause billions of dollars in damage each yearly',
        'Landslides can travel at speeds over 35 mph',
        'All 50 US states have some landslide risk',
        'Most landslide fatalities are caused by debris flows',
        'Climate change may increase landslide risks globally'
      ],
      preparednessLevel: 45
    },
    heatwave: {
      id: 'heatwave',
      title: 'Heatwave',
      icon: Sun,
      color: 'bg-yellow-500',
      image: 'https://images.unsplash.com/photo-1687982122778-9a5883144dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGRlc2VydCUyMHN1bnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Extreme temperature safety and heat illness prevention',
      whatIs: 'A heatwave is a prolonged period of excessively hot weather, which may be accompanied by high humidity. The definition varies by region, but generally involves temperatures significantly above average for the area and time of year, lasting for multiple days.',
      causes: [
        'High-pressure weather systems trapping hot air',
        'Urban heat island effect in cities',
        'Climate change increasing global temperatures',
        'Drought conditions reducing evapotranspiration',
        'Clear skies allowing maximum solar radiation',
        'Lack of cooling nighttime temperatures'
      ],
      dos: [
        'Stay hydrated by drinking water regularly',
        'Stay indoors during peak heat hours (10am-4pm)',
        'Wear light-colored, loose-fitting clothing',
        'Use fans, air conditioning, or visit cooling centers',
        'Check on elderly neighbors and relatives',
        'Take cool showers or baths to lower body temperature'
      ],
      donts: [
        'Don\'t leave anyone in parked vehicles',
        'Don\'t ignore signs of heat exhaustion or heat stroke',
        'Don\'t exercise outdoors during extreme heat',
        'Don\'t wait until you\'re thirsty to drink water',
        'Don\'t consume alcohol or caffeine in excess',
        'Don\'t wear dark or heavy clothing'
      ],
      beforeTips: [
        'Prepare cooling systems and check air conditioning',
        'Stock up on water and electrolyte drinks',
        'Identify public cooling centers in your area',
        'Plan outdoor activities for cooler parts of day',
        'Create shade around your home with awnings or trees',
        'Prepare emergency kit for power outages'
      ],
      duringTips: [
        'Monitor heat index and weather warnings',
        'Drink water every 15-20 minutes even if not thirsty',
        'Take frequent breaks in shade or air conditioning',
        'Watch for symptoms of heat-related illness',
        'Avoid strenuous outdoor activities',
        'Use wet towels on neck and wrists to cool down'
      ],
      afterTips: [
        'Continue hydrating even as temperatures drop',
        'Check on community members who may need help',
        'Assess any heat damage to property or gardens',
        'Review cooling strategies for future events',
        'Seek medical attention for any heat-related symptoms',
        'Plan improvements to home cooling systems'
      ],
      facts: [
        'Heat kills more people annually than all other weather events combined',
        'Urban areas can be 1-7°F hotter than surrounding areas',
        'Heat index combines temperature and humidity effects',
        'The human body cools itself primarily through sweating',
        'Children and elderly are most vulnerable to heat stress',
        'Heatwaves are becoming more frequent due to climate change'
      ],
      preparednessLevel: 60
    },
    avalanche: {
      id: 'avalanche',
      title: 'Avalanche',
      icon: Snowflake,
      color: 'bg-cyan-500',
      image: 'https://images.unsplash.com/photo-1687982122778-9a5883144dfb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWF0d2F2ZSUyMGRlc2VydCUyMHN1bnxlbnwxfHx8fDE3NTc4MzUwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Snow and ice hazard safety in mountainous areas',
      whatIs: 'An avalanche is a rapid flow of snow down a slope, such as a hill or mountain. Avalanches can be triggered naturally or by human activity, and they can travel at speeds exceeding 80 mph, making them extremely dangerous for anyone in their path.',
      causes: [
        'Fresh snowfall adding weight to unstable snowpack',
        'Rapid temperature changes weakening snow layers',
        'Wind loading snow onto leeward slopes',
        'Human triggers like skiing, snowmobiling, or hiking',
        'Natural triggers like rockfall or tree collapse',
        'Terrain features that concentrate stress on snowpack'
      ],
      dos: [
        'Check avalanche forecasts before heading to mountains',
        'Carry avalanche safety equipment (beacon, probe, shovel)',
        'Travel with trained partners and stay together',
        'Learn to recognize avalanche terrain and conditions',
        'Take avalanche safety courses and practice rescue skills',
        'Plan escape routes and safe zones before crossing slopes'
      ],
      donts: [
        'Don\'t travel alone in avalanche country',
        'Don\'t ignore avalanche warnings and forecasts',
        'Don\'t cross suspicious slopes one at a time',
        'Don\'t assume slopes are safe because others crossed',
        'Don\'t venture out without proper safety equipment',
        'Don\'t attempt rescue without proper training'
      ],
      beforeTips: [
        'Study avalanche education and safety courses',
        'Check weather and avalanche conditions regularly',
        'Plan routes through safer, lower-angle terrain',
        'Inform others of your travel plans and timing',
        'Practice with avalanche rescue equipment regularly',
        'Build knowledge of local terrain and conditions'
      ],
      duringTips: [
        'If caught, try to ski or ride out of the avalanche',
        'If swept up, try to stay on surface using swimming motions',
        'Protect airway and try to create air pocket near face',
        'Fight to stay upright and on top of debris',
        'Drop heavy equipment but keep essential safety gear',
        'Try to grab trees or rocks to stop your descent'
      ],
      afterTips: [
        'Mark last seen point of buried victims immediately',
        'Switch avalanche beacons to search mode quickly',
        'Probe and dig strategically to find victims',
        'Begin CPR immediately once victim is uncovered',
        'Send for professional rescue help but don\'t wait',
        'Treat for hypothermia and trauma injuries'
      ],
      facts: [
        'About 150 people die in avalanches annually worldwide',
        'Most avalanche victims are recreational backcountry users',
        'Avalanches can reach speeds of 200+ mph in extreme cases',
        '90% of avalanche victims survive if found within 15 minutes',
        'Human-triggered avalanches cause 90% of fatalities',
        'Avalanche debris can be as hard as concrete when it stops'
      ],
      preparednessLevel: 40
    }
  };

  if (selectedModule && moduleDetails[selectedModule as keyof typeof moduleDetails]) {
    return (
      <ModuleDetailView 
        module={moduleDetails[selectedModule as keyof typeof moduleDetails]} 
        onBack={() => setSelectedModule(null)}
        onNavigateToQuiz={onNavigateToQuiz}
      />
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="pt-12">
        <h1 className="text-3xl font-semibold text-white mb-2">Learning Modules</h1>
        <p className="text-white/70">Comprehensive disaster preparedness guides</p>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Card 
              key={module.id} 
              className="p-4 bg-white/10 backdrop-blur-lg border-white/20 shadow-xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedModule(module.id);
                markModuleViewed(module.id);
              }}
            >
              <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={module.image}
                  alt={module.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute top-2 right-2">
                  <div className={`p-2 rounded-full ${module.color} bg-opacity-90`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-2 left-2">
                  <div className="flex items-center space-x-2">
                    {moduleProgress[module.id]?.completed ? (
                      <Badge variant="secondary" className="bg-emerald-400/20 text-emerald-300 border-emerald-400/30 text-xs">
                        Completed
                      </Badge>
                    ) : moduleProgress[module.id]?.viewed ? (
                      <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-300 border-yellow-400/30 text-xs">
                        In Progress
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-cyan-400/20 text-cyan-300 border-cyan-400/30 text-xs">
                        Start Learning
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{module.title}</h3>
                  <ChevronRight className="w-5 h-5 text-white/60" />
                </div>
                <p className="text-sm text-white/80">{module.description}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}