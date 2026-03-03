<template>
  <div>
    <div class="page-header">
      <h1>Contact</h1>
      <p>For academic correspondence, media enquiries, and book orders.</p>
    </div>
    <div class="contact-page">
      <div v-if="submitted" class="alert-success" style="margin-bottom:2rem;">
        ✓ Your message has been sent. Dr. Batsaikhan Ookhnoi or his team will respond within 3–5 business days.
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;margin-bottom:3rem;" class="contact-grid">
        <div>
          <h2 class="section-title-left" style="font-size:1.4rem;">Get in Touch</h2>
          <p style="font-size:0.95rem;color:var(--text-light);line-height:1.8;margin-bottom:1rem;margin-top:1.5rem;">
            For academic collaboration, lecture invitations, or media enquiries, please use the contact form or reach out directly.
          </p>
          <p style="font-size:0.95rem;color:var(--text-light);line-height:1.8;margin-bottom:1rem;">
            For book orders, please visit the <NuxtLink to="/books" style="color:var(--primary-blue);font-weight:700;">Books</NuxtLink> page.
          </p>
          <div style="margin-top:2rem;">
            <p style="font-size:0.82rem;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:0.5rem;">Institutional Address</p>
            <p style="font-size:0.92rem;color:var(--text-light);line-height:1.7;">
              Institute of History and Archaeology<br />
              Mongolian Academy of Sciences<br />
              Jukov Avenue 77<br />
              Ulaanbaatar 15141, Mongolia
            </p>
          </div>
          <div style="margin-top:1.5rem;">
            <p style="font-size:0.82rem;text-transform:uppercase;letter-spacing:1px;font-weight:700;margin-bottom:0.5rem;">Publisher</p>
            <p style="font-size:0.92rem;color:var(--text-light);">
              <strong style="color:var(--text-dark);">Rennab</strong><br />Ulaanbaatar, Mongolia
            </p>
          </div>
        </div>
        <div class="order-form" style="border:1px solid var(--border);">
          <h2 style="font-size:1.4rem;margin-bottom:0.3rem;">Send a Message</h2>
          <p class="form-subtitle">All fields marked * are required.</p>
          <div class="form-group">
            <label class="form-label">Name *</label>
            <input v-model="form.name" type="text" class="form-input" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label class="form-label">Email *</label>
            <input v-model="form.email" type="email" class="form-input" placeholder="your@email.com" />
          </div>
          <div class="form-group">
            <label class="form-label">Subject *</label>
            <select v-model="form.subject" class="form-select">
              <option value="">Select a subject</option>
              <option>Academic Collaboration</option>
              <option>Lecture / Talk Invitation</option>
              <option>Media Enquiry</option>
              <option>Book Order</option>
              <option>General Enquiry</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Message *</label>
            <textarea v-model="form.message" class="form-textarea" placeholder="Your message…" style="min-height:130px;" />
          </div>
          <div v-if="formError" class="alert-error">{{ formError }}</div>
          <button class="btn" :disabled="submitting" @click="submitForm">
            {{ submitting ? 'Sending…' : 'Send Message' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact — Batsaikhan Ookhnoi' })
const api = useApi()
const form = ref({ name: '', email: '', subject: '', message: '' })
const formError = ref('')
const submitting = ref(false)
const submitted = ref(false)

async function submitForm() {
  formError.value = ''
  if (!form.value.name.trim())    { formError.value = 'Please enter your name.'; return }
  if (!form.value.email.trim())   { formError.value = 'Please enter your email.'; return }
  if (!form.value.subject)        { formError.value = 'Please select a subject.'; return }
  if (!form.value.message.trim()) { formError.value = 'Please enter your message.'; return }

  submitting.value = true
  try {
    await api.post('/contact', form.value)
    submitted.value = true
    form.value = { name: '', email: '', subject: '', message: '' }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } catch (e: any) {
    formError.value = e?.data?.message || 'Failed to send message. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
@media (max-width: 768px) {
  .contact-grid { grid-template-columns: 1fr !important; }
}
</style>
