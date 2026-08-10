import CheckoutField from './CheckoutField'

// Formulário de endereço — extraído do HTML de produção do Checkout
// (grid md:grid-cols-12: CEP 4, Rua 8, Número 4, Complemento 8, Bairro 6, Cidade 6).
// Exibido apenas quando "Entrega" está selecionado.
function AddressForm({ values, errors, onChange }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
      <CheckoutField
        id="cep"
        label="CEP"
        required
        error={errors.cep}
        className="md:col-span-4"
        value={values.cep}
        onChange={(e) => onChange('cep', e.target.value)}
        placeholder="00000-000"
        inputMode="numeric"
        autoComplete="postal-code"
      />
      <CheckoutField
        id="street"
        label="Rua / Avenida"
        required
        error={errors.street}
        className="md:col-span-8"
        value={values.street}
        onChange={(e) => onChange('street', e.target.value)}
        placeholder="Rua das Flores"
        autoComplete="street-address"
      />
      <CheckoutField
        id="number"
        label="Número"
        required
        error={errors.number}
        className="md:col-span-4"
        value={values.number}
        onChange={(e) => onChange('number', e.target.value)}
        placeholder="123"
        inputMode="numeric"
      />
      <CheckoutField
        id="complement"
        label="Complemento (Opcional)"
        className="md:col-span-8"
        value={values.complement}
        onChange={(e) => onChange('complement', e.target.value)}
        placeholder="Apto 45, Bloco B"
      />
      <CheckoutField
        id="neighborhood"
        label="Bairro"
        required
        error={errors.neighborhood}
        className="md:col-span-6"
        value={values.neighborhood}
        onChange={(e) => onChange('neighborhood', e.target.value)}
        placeholder="Centro"
      />
      <CheckoutField
        id="city"
        label="Cidade"
        required
        error={errors.city}
        className="md:col-span-6"
        value={values.city}
        onChange={(e) => onChange('city', e.target.value)}
        placeholder="Maricá"
        autoComplete="address-level2"
      />
    </div>
  )
}

export default AddressForm
