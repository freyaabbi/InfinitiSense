// Central content + assumptions for Kleanbotics site.

export const UNIT_PRICE = 32000 // ₹ per unit (retail reference)

export const PROBLEM_CARDS = [
  {
    icon: '🌫️',
    title: 'Dust & dirt buildup',
    back: 'Fine desert dust, bird droppings and pollen coat panels within days, blocking sunlight.',
  },
  {
    icon: '📅',
    title: 'Inconsistent cleaning',
    back: 'Manual crews clean on irregular schedules, so output swings unpredictably.',
  },
  {
    icon: '🧽',
    title: 'Damage from bad cleaning',
    back: 'Abrasive pads and high-pressure water cause micro-cracks and void warranties.',
  },
  {
    icon: '📉',
    title: 'Reduced energy output',
    back: 'Soiling losses of 20–30% quietly erode generation and revenue every day.',
  },
  {
    icon: '🏜️',
    title: 'Large / remote sites',
    back: 'Utility farms span hundreds of acres in remote terrain — hard to service manually.',
  },
  {
    icon: '💸',
    title: 'High manual costs',
    back: 'Labour, water tankers and logistics make manual O&M expensive and unscalable.',
  },
]

export const SUBSYSTEMS = [
  { key: 'edgeai', label: 'EdgeAI processor', desc: 'On-device inference for navigation & cleaning decisions.', angle: -70 },
  { key: 'imu', label: 'IMU', desc: 'Orientation & tilt sensing for edge and slope awareness.', angle: -35 },
  { key: 'prox', label: 'Proximity sensors', desc: 'Obstacle and panel-edge detection to stay on-track.', angle: 0 },
  { key: 'motor', label: 'Motor-current sensing', desc: 'Reads drive/brush current for health & fault detection.', angle: 35 },
  { key: 'rain', label: 'Rain sensor', desc: 'Detects rain to pause and park safely.', angle: 70 },
  { key: 'gsm', label: 'GSM module', desc: 'Cellular link to the cloud fleet dashboard.', angle: 110 },
  { key: 'brush', label: 'Brush & drive system', desc: 'Waterless microfibre brush + traction drive.', angle: 145 },
]

export const FEATURES = [
  {
    id: 'sense',
    node: 'Sense',
    title: 'Multi-sensor intelligence',
    color: 'cyan',
    heading: 'Smart safety & predictive maintenance',
    body: 'IMU + proximity + motor-current sensing detect edges, obstacles, motor health and early faults — before they become failures.',
    points: ['Edge & obstacle detection', 'Motor health monitoring', 'Early fault detection'],
  },
  {
    id: 'decide',
    node: 'Decide',
    title: 'EdgeAI autonomous cleaning',
    color: 'solar',
    heading: 'EdgeAI decision engine',
    body: 'On-device navigation, cleaning optimization and real-time decisions — with no constant cloud dependency.',
    points: ['On-device navigation', 'Cleaning-path optimization', 'Real-time decisions offline'],
  },
  {
    id: 'act',
    node: 'Act',
    title: 'Weather-aware & self-protecting',
    color: 'cyan',
    heading: 'Weather-aware & self-protecting',
    body: 'Rain detected → the robot pauses or parks in a safe position, protecting itself and the panels.',
    points: ['Rain-triggered pause', 'Auto park & dock', 'Self-protection routines'],
  },
  {
    id: 'connect',
    node: 'Connect',
    title: 'GSM-connected fleet dashboard',
    color: 'solar',
    heading: 'GSM-connected fleet dashboard',
    body: 'Remote view of status, cleaning cycles, battery/energy, faults and performance across every site.',
    points: ['Live fleet status', 'Cleaning & energy logs', 'Fault alerts'],
  },
]

export const COMPARISON = {
  columns: ['Traditional Cleaning', 'Robotic Competitors', 'Kleanbotics'],
  rows: [
    ['EdgeAI decision engine', '—', 'Varies', 'Core architecture'],
    ['Automation', 'Manual', 'Automated', 'Fully autonomous'],
    ['Water & manpower', 'High', 'Low–zero', 'Low–zero'],
    ['Remote monitoring', '—', 'Yes', 'Cloud dashboard'],
    ['Multi-sensor intelligence', '—', 'Varies', 'IMU + current + rain + proximity'],
    ['Condition & fault detection', 'Manual', 'Alarms', 'Real-time AI-assisted'],
    ['Autonomous response', 'Manual', 'Automated', 'Sense → decide → act'],
    ['Closed-loop solar O&M', '—', 'Partial', 'EdgeAI + robot + cloud + fleet intelligence'],
  ],
}

export const MARKET_GROWTH = [
  { year: '2024', value: 145 },
  { year: '2025', value: 179 },
  { year: '2027', value: 340 },
  { year: '2029', value: 640 },
  { year: '2031', value: 980 },
  { year: '2033', value: 1310 },
  { year: '2035', value: 1670 },
]

export const GROWTH_PROJECTION = [
  { year: '2026', units: 25, revenue: 8, note: 'Pilot' },
  { year: '2027', units: 100, revenue: 32, note: 'Scale-up' },
  { year: '2028', units: 150, revenue: 48, note: 'Expansion' },
  { year: '2029', units: 500, revenue: 160, note: 'Growth' },
]

export const ROADMAP = [
  {
    date: 'Jul 2026',
    title: 'Ideation',
    body: 'Product spec refinement; rugged design with protection & connectivity.',
    done: false,
  },
  {
    date: 'Aug 2026',
    title: 'Design & development',
    body: 'Schematic & layout; firmware feasibility.',
    done: false,
  },
  {
    date: 'Nov 2026',
    title: 'First prototype',
    body: 'PCB finalised; sensor & motor-control firmware; dashboard dev begins.',
    done: false,
    here: true,
  },
  {
    date: 'May 2027',
    title: 'Cloud integration',
    body: 'Cloud platform integration; market testing; alpha customers; go-to-market.',
    done: false,
  },
  {
    date: 'Q4 2027',
    title: 'Commercial revenue',
    body: 'Commercial revenue begins.',
    done: false,
  },
]

export const SEGMENTS = {
  farms: {
    icon: '🏭',
    label: 'Solar Farms',
    tag: 'B2B',
    headline: 'Utility-scale O&M, automated',
    props: [
      'Direct industrial sales & customisation',
      'Fleet of robots across large arrays',
      'Cloud dashboard for site managers',
      'Waterless cleaning at remote sites',
    ],
    cta: 'Talk to sales',
  },
  rooftop: {
    icon: '🏠',
    label: 'Rooftop Homes',
    tag: 'B2C',
    headline: 'Plug-and-play rooftop cleaning',
    props: [
      'E-commerce, ready to deploy',
      'Compact, safe for home rooftops',
      'App view of savings & cycles',
      'Affordable at ₹32,000/unit',
    ],
    cta: 'Buy for my rooftop',
  },
  oem: {
    icon: '🔧',
    label: 'OEM Partners',
    tag: 'Platform',
    headline: 'Build on our EdgeAI platform',
    props: [
      'Platform & design services',
      'Reference hardware + firmware',
      'White-label fleet dashboard',
      'Co-development & licensing',
    ],
    cta: 'Explore partnership',
  },
}

export const PARTNER_CARDS = [
  { icon: '💰', title: 'Funding', body: 'For electronics & mechanical enclosure development.', type: 'Investor' },
  { icon: '🤝', title: 'Mentorship & networking', body: 'Industry guidance and connections.', type: 'Other' },
  { icon: '🧪', title: 'Beta testing & pilot sites', body: 'Host a robot at your solar site.', type: 'Solar farm' },
  { icon: '🔬', title: 'Field validation', body: 'Validate our electronics in real conditions.', type: 'Other' },
  { icon: '📈', title: 'Revenue partnerships', body: 'Channel & revenue-share collaborations.', type: 'OEM' },
]

export const BUILD_LOG = [
  { title: 'Chassis concept render', date: 'Jul 2026', tall: true, tone: 'cyan' },
  { title: 'Sensor array bench test', date: 'Aug 2026', tall: false, tone: 'solar' },
  { title: 'PCB layout v0.3', date: 'Sep 2026', tall: false, tone: 'cyan' },
  { title: 'Brush & drive rig', date: 'Sep 2026', tall: true, tone: 'solar' },
  { title: 'Motor-current sensing test', date: 'Oct 2026', tall: false, tone: 'cyan' },
  { title: 'Dashboard first light', date: 'Oct 2026', tall: true, tone: 'cyan' },
  { title: 'Rain sensor trial', date: 'Nov 2026', tall: false, tone: 'solar' },
  { title: 'Field mockup on panel row', date: 'Nov 2026', tall: false, tone: 'cyan' },
]

export const FLEET_SITES = [
  { id: 'RJ', name: 'Rajasthan', x: 30, y: 40, robots: 12 },
  { id: 'GJ', name: 'Gujarat', x: 20, y: 52, robots: 9 },
  { id: 'KA', name: 'Karnataka', x: 38, y: 74, robots: 7 },
  { id: 'TN', name: 'Tamil Nadu', x: 44, y: 88, robots: 6 },
  { id: 'BR', name: 'Bihar', x: 66, y: 46, robots: 4 },
]
