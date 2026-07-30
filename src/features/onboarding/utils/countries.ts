// All ISO 3166-1 alpha-2 codes — Intl.DisplayNames resolves them to English names at runtime.
const ISO_CODES: string[] = [
  'AF','AX','AL','DZ','AS','AD','AO','AI','AG','AR','AM','AW','AU','AT','AZ',
  'BS','BH','BD','BB','BY','BE','BZ','BJ','BM','BT','BO','BQ','BA','BW','BR',
  'IO','BN','BG','BF','BI','CV','KH','CM','CA','KY','CF','TD','CL','CX','CC',
  'CO','KM','CD','CG','CK','CR','HR','CU','CW','CY','CZ','DK','DJ','DM','DO',
  'EC','EG','SV','GQ','ER','EE','SZ','ET','FK','FO','FJ','FI','FR','GF','PF',
  'TF','GA','GM','GE','DE','GH','GI','GR','GL','GD','GP','GU','GT','GG','GN',
  'GW','GY','HT','HM','VA','HN','HK','HU','IS','IN','ID','IR','IQ','IE','IM',
  'IL','IT','JM','JP','JE','JO','KZ','KE','KI','KP','KR','KW','KG','LA','LV',
  'LB','LS','LR','LY','LI','LT','LU','MO','MG','MW','MY','MV','ML','MT','MH',
  'MQ','MR','MU','YT','MX','FM','MD','MC','MN','ME','MS','MA','MZ','MM','NA',
  'NR','NP','NL','NC','NZ','NI','NE','NG','NU','NF','MK','MP','NO','OM','PK',
  'PW','PS','PA','PG','PY','PE','PH','PN','PL','PT','PR','QA','RE','RO','RU',
  'RW','BL','SH','KN','LC','MF','PM','VC','WS','SM','ST','SA','SN','RS','SC',
  'SL','SG','SX','SK','SI','SB','SO','ZA','GS','SS','ES','LK','SD','SR','SJ',
  'SE','CH','SY','TW','TJ','TZ','TH','TL','TG','TK','TO','TT','TN','TR','TM',
  'TC','TV','UG','UA','AE','GB','US','UM','UY','UZ','VU','VE','VN','VG','VI',
  'WF','EH','YE','ZM','ZW',
]

const _dn = new Intl.DisplayNames(['en'], { type: 'region' })

/** Sorted list of countries with ISO code + English display name. */
export const COUNTRIES: { code: string; name: string }[] = ISO_CODES
  .map(code => ({ code, name: _dn.of(code) ?? code }))
  .filter(c => c.name !== c.code)
  .sort((a, b) => a.name.localeCompare(b.name))

/** "US" → 🇺🇸 using Unicode regional indicator characters. */
export function flagEmoji(code: string): string {
  return [...code.toUpperCase()]
    .map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join('')
}

const _nameCache = new Map<string, string>()

/** ISO code → English country name, memoised. Falls back to the code itself. */
export function countryName(code: string): string {
  const key = code.toUpperCase()
  if (_nameCache.has(key)) return _nameCache.get(key)!
  const name = _dn.of(key) ?? key
  _nameCache.set(key, name)
  return name
}

/**
 * Infers the user's country from browser locale signals.
 * Tries each entry in navigator.languages; returns the first 2-letter country
 * segment that resolves to a known name.
 */
export function detectCountryCode(): string | null {
  const locales: string[] = []
  if (typeof navigator !== 'undefined') {
    if (navigator.language) locales.push(navigator.language)
    if (navigator.languages) locales.push(...navigator.languages)
  }
  for (const locale of locales) {
    const parts = locale.split('-')
    const segment = parts[parts.length - 1]?.toUpperCase() ?? ''
    if (/^[A-Z]{2}$/.test(segment)) {
      try {
        const name = _dn.of(segment)
        if (name && name !== segment) return segment
      } catch {
        // not a valid region code — skip
      }
    }
  }
  return null
}
