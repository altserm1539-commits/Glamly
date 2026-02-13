// script.js - manejador simple para el formulario de demo y tracking básico
document.addEventListener('DOMContentLoaded', function(){
  // helper: show field error (global para ambos formularios)
  function showFieldError(input, text){
    input.classList.add('input-error');
    let next = input.nextElementSibling;
    if(!next || !next.classList.contains('field-error-msg')){
      next = document.createElement('div');
      next.className = 'field-error-msg';
      input.parentNode.insertBefore(next, input.nextSibling);
    }
    next.textContent = text;
  }

  function clearFieldError(input){
    input.classList.remove('input-error');
    let next = input.nextElementSibling;
    if(next && next.classList.contains('field-error-msg')) next.remove();
  }

  const form = document.getElementById('demoForm');
  const msg = document.getElementById('formMessage');
  const whatsappBtn = document.getElementById('contactWhatsapp');

  // Track CTA clicks
  document.querySelectorAll('[data-action]').forEach(el=>{
    el.addEventListener('click', function(){
      const action = el.getAttribute('data-action');
      console.log('CTA event:', action);
      // Aquí podrías integrar analytics (GA/FB/gtag)
    });
  });

  if(whatsappBtn){
    whatsappBtn.addEventListener('click', function(){
      window.open('https://wa.me/5491123456789?text=Hola%20Glamly,%20quiero%20una%20demo', '_blank');
    });
  }

  /***** Payment form handling *****/
  const paymentForm = document.getElementById('paymentForm');
  console.log('Payment form encontrado:', paymentForm);
  if(paymentForm){
    paymentForm.addEventListener('submit', function(e){
      console.log('Form submit detectado');
      e.preventDefault();
      const card = paymentForm.querySelector('[name="cardNumber"]');
      const exp = paymentForm.querySelector('[name="expiry"]');
      const cvv = paymentForm.querySelector('[name="cvv"]');
      const plan = paymentForm.querySelector('[name="plan"]:checked');
      const cycle = paymentForm.querySelector('[name="cycle"]:checked');
      const messageDiv = document.getElementById('paymentMessage');
      messageDiv.textContent = '';

      console.log('Plan:', plan);
      console.log('Cycle:', cycle);
      console.log('Card:', card.value);
      console.log('Expiry:', exp.value);
      console.log('CVV:', cvv.value);

      let valid = true;
      // clear any previous per-field errors
      [card, exp, cvv].forEach(clearFieldError);

      if(!card.value.trim()){
        valid = false;
        showFieldError(card,'Número de tarjeta requerido');
      }
      if(!exp.value.trim()){
        valid = false;
        showFieldError(exp,'Fecha de expiración requerida');
      }
      if(!cvv.value.trim()){
        valid = false;
        showFieldError(cvv,'CVV requerido');
      }

      if(!plan){
        valid = false;
        messageDiv.textContent = 'Selecciona un plan.';
      }
      if(!cycle){
        valid = false;
        messageDiv.textContent = 'Selecciona mensual o anual.';
      }

      console.log('Valid:', valid);

      if(!valid){
        if(!messageDiv.textContent) messageDiv.textContent = 'Corrige los errores marcados.';
        console.log('Validación fallida');
        return;
      }
      // simulación de pago exitoso: redirigir a página de confirmación
      console.log('Redirigiendo a success.html');
      window.location.href = 'success.html';
    });
  }

  if(!form) return;

  function validateForm(payload){
    const errors = {};
    if(!payload.name || payload.name.trim().length < 2) errors.name = 'Nombre requerido (mín. 2 caracteres)';
    if(!payload.email) errors.email = 'Email requerido';
    else {
      const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
      if(!re.test(payload.email)) errors.email = 'Email inválido';
    }
    return errors;
  }

  form.addEventListener('submit', async function(e){
    e.preventDefault();
    msg.textContent = '';

    const data = new FormData(form);
    const payload = {};
    data.forEach((v,k)=>payload[k]=v && v.trim ? v.trim() : v);

    // clear previous field errors
    form.querySelectorAll('input,textarea').forEach(clearFieldError);

    const errors = validateForm(payload);
    if(Object.keys(errors).length){
      // show first error and focus
      for(const field in errors){
        const input = form.querySelector(`[name="${field}"]`);
        if(input){
          showFieldError(input, errors[field]);
          input.focus();
          break;
        }
      }
      msg.textContent = 'Corrige los errores antes de enviar.';
      return;
    }

    // disable submit
    const submitBtn = form.querySelector('button[type="submit"]');
    if(submitBtn) submitBtn.disabled = true;

    try{
      // send to endpoint
      const res = await fetch('/api/demo', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(payload)
      });

      if(res.ok){
        // success UI
        msg.innerHTML = '';
        const success = document.createElement('div');
        success.className = 'form-success';
        success.textContent = '¡Gracias! Solicitud recibida. Te contactamos en menos de 24 horas.';
        form.parentNode.insertBefore(success, form);
        form.remove();
        // analytics
        if(window.gtag) gtag('event','demo_requested',{method:'landing_form'});
        console.log('Demo request sent', payload);
        return;
      }

      throw new Error('no-ok');
    }catch(err){
      // fallback: open mailto
      const subject = encodeURIComponent('Solicitud de demo Glamly');
      const body = encodeURIComponent(`Nombre: ${payload.name}\nNegocio: ${payload.business || ''}\nEmail: ${payload.email}\nTel: ${payload.phone || ''}\nMensaje: ${payload.message || ''}`);
      window.location.href = `mailto:ventas@glamly.example?subject=${subject}&body=${body}`;
      msg.textContent = 'No se pudo enviar automáticamente; abrimos tu cliente de correo para completar la solicitud.';
    }finally{
      if(submitBtn) submitBtn.disabled = false;
    }
  });

});