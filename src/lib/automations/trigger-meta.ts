import type { AutomationTriggerType } from '@/types'

export interface TriggerMeta {
  label: string
  labelKey?: string
  /** Tailwind classes for the Badge pill on the list row. */
  pillClass: string
}

export const TRIGGER_META: Record<AutomationTriggerType, TriggerMeta> = {
  new_message_received: {
    label: 'New Message',
    labelKey: 'automationTrigger.newMessage',
    pillClass: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  },
  first_inbound_message: {
    label: 'First Message from Contact',
    labelKey: 'automationTrigger.firstMessage',
    pillClass: 'border-teal-500/30 bg-teal-500/10 text-teal-300',
  },
  keyword_match: {
    label: 'Keyword Match',
    labelKey: 'automationTrigger.keywordMatch',
    pillClass: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  },
  new_contact_created: {
    label: 'New Contact',
    labelKey: 'automationTrigger.newContact',
    pillClass: 'border-primary/30 bg-primary/10 text-primary',
  },
  conversation_assigned: {
    label: 'Conversation Assigned',
    labelKey: 'automationTrigger.conversationAssigned',
    pillClass: 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300',
  },
  tag_added: {
    label: 'Tag Added',
    labelKey: 'automationTrigger.tagAdded',
    pillClass: 'border-amber-500/30 bg-amber-500/10 text-amber-300',
  },
  time_based: {
    label: 'Time-Based',
    labelKey: 'automationTrigger.timeBased',
    pillClass: 'border-slate-500/30 bg-slate-500/10 text-muted-foreground',
  },
}

export function triggerMeta(t: AutomationTriggerType | string): TriggerMeta {
  return (
    TRIGGER_META[t as AutomationTriggerType] ?? {
      label: t,
      labelKey: '',
      pillClass: 'border-slate-500/30 bg-slate-500/10 text-muted-foreground',
    }
  )
}

export function formatRelative(iso: string | null | undefined): string {
  if (!iso) return 'never'
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'never'
  const diffSec = Math.round((Date.now() - then) / 1000)
  if (diffSec < 60) return 'just now'
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`
  if (diffSec < 2_592_000) return `${Math.floor(diffSec / 86400)}d ago`
  return new Date(iso).toLocaleDateString()
}

export function getRelativeTimeKey(iso: string | null | undefined): string {
  if (!iso) return 'automationTrigger.never'
  const then = new Date(iso).getTime()
  if (Number.isNaN(then)) return 'automationTrigger.never'
  const diffSec = Math.round((Date.now() - then) / 1000)
  if (diffSec < 60) return 'automationTrigger.justNow'
  if (diffSec < 3600) return 'automationTrigger.minutesAgo'
  if (diffSec < 86400) return 'automationTrigger.hoursAgo'
  if (diffSec < 2_592_000) return 'automationTrigger.daysAgo'
  return ''
}
