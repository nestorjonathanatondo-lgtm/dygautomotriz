import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const roles = {
  administracion: 'Administración',
  tecnico: 'Técnico',
  cliente: 'Cliente',
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[char])

function renderLogin() {
  const root = document.getElementById('root')
  if (!root) return
  root.innerHTML = `
    <main class="dgapp-login-shell">
      <section class="dgapp-login-card" aria-labelledby="dgapp-heading">
        <button class="dgapp-back" type="button">← Volver a D&G Automotriz</button>
        <img class="dgapp-logo" src="/dg-logo.png" alt="D&G Diésel & Gasolina Automotriz" />
        <h1 id="dgapp-heading">dgapp</h1>
        <form class="dgapp-login-form">
          <label for="dgapp-username">Usuario</label>
          <input id="dgapp-username" name="username" type="email" autocomplete="username" placeholder="usuario@ejemplo.com" required />
          <label for="dgapp-password">Contraseña</label>
          <input id="dgapp-password" name="password" type="password" autocomplete="current-password" placeholder="Contraseña" required />
          <button type="submit">Ingresar</button>
          <p class="dgapp-status" role="status" aria-live="polite"></p>
        </form>
      </section>
    </main>`
  root.querySelector('.dgapp-back').onclick = () => { window.location.href = '/' }
  root.querySelector('.dgapp-login-form').onsubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const status = root.querySelector('.dgapp-status')
    const button = event.currentTarget.querySelector('button[type="submit"]')
    status.textContent = 'Verificando acceso…'
    button.disabled = true
    const { data, error } = await supabase.auth.signInWithPassword({ email: form.get('username'), password: form.get('password') })
    if (error) {
      status.textContent = error.status === 429 ? 'Demasiados intentos. Espera un momento.' : 'Usuario o contraseña incorrectos.'
      button.disabled = false
      return
    }
    const { data: profile, error: profileError } = await supabase.from('profiles').select('username, role').eq('id', data.user.id).single()
    if (profileError || !profile) {
      status.textContent = 'Tu usuario no tiene un perfil dgapp asignado.'
      await supabase.auth.signOut()
      button.disabled = false
      return
    }
    renderDashboard(profile)
  }
}

function renderDashboard(profile) {
  const root = document.getElementById('root')
  root.innerHTML = `<main class="dgapp-login-shell"><section class="dgapp-login-card dgapp-dashboard"><img class="dgapp-logo" src="/dg-logo.png" alt="D&G Diésel & Gasolina Automotriz" /><h1>dgapp</h1><p>Sesión iniciada como <strong>${escapeHtml(roles[profile.role] || profile.role)}</strong>.</p><p class="dgapp-user">${escapeHtml(profile.username)}</p><button class="dgapp-logout" type="button">Cerrar sesión</button></section></main>`
  root.querySelector('.dgapp-logout').onclick = async () => { await supabase.auth.signOut(); renderLogin() }
}

if (window.location.pathname === '/dgapp') {
  window.setTimeout(renderLogin, 900)
}
