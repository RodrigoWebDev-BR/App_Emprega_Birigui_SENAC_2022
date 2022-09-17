export const formatarCPF = (cpf) => {
  let aocpf = cpf;
  aocpf = aocpf.replace(/(\d{3})(\d)/, '$1.$2');
  aocpf = aocpf.replace(/(\d{3})(\d)/, '$1.$2');
  aocpf = aocpf.replace(/(\d{3})(\d{1,2})$/, '$1.$2');
  return aocpf;
};

export const formatarRG = (rg) => {
  let aorg = rg;
  aorg = aorg.replace(/(\d{2})(\d)/, '$1.$2');
  aorg = aorg.replace(/(\d{3})(\d)/, '$1.$2');
  aorg = aorg.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return aorg;
};

export const validaCPF = (cpf): boolean => {
  /*eslint one-var: ["error", "always"]*/
  let rest, sum;

  if (cpf === undefined || cpf.trim().length === 0 || cpf === '00000000000') {
    return;
  }
  cpf = cpf.replace('.', '').replace('.', '').replace('-', '');

  sum = 0;

  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(9, 10), 10)) {
    return false;
  }

  sum = 0;
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
  }
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) {
    rest = 0;
  }
  if (rest !== parseInt(cpf.substring(10, 11), 10)) {
    return false;
  }

  return true;
};

export const validaEmail = (email): boolean => {
  // eslint-disable-next-line max-len
  if (
    !email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    return;
  }
  return true;
};

export const validarCNPJ = (value): boolean => {
    if (!value) return false

    // Aceita receber o valor como string, número ou array com todos os dígitos
    const isString = typeof value === 'string'
    const validTypes = isString || Number.isInteger(value) || Array.isArray(value)
  
    // Elimina valor em formato inválido
    if (!validTypes) return false
  
    // Filtro inicial para entradas do tipo string
    if (isString) {
      // Limita ao máximo de 18 caracteres, para CNPJ formatado
      if (value.length > 18) return false
  
      // Teste Regex para veificar se é uma string apenas dígitos válida
      const digitsOnly = /^\d{14}$/.test(value)
      // Teste Regex para verificar se é uma string formatada válida
      const validFormat = /^\d{2}.\d{3}.\d{3}\/\d{4}-\d{2}$/.test(value)
  
      // Se o formato é válido, usa um truque para seguir o fluxo da validação
      if (digitsOnly || validFormat) true
      // Se não, retorna inválido
      else return false
    }
  
    // Guarda um array com todos os dígitos do valor
    const match = value.toString().match(/\d/g)
    const numbers = Array.isArray(match) ? match.map(Number) : []
  
    // Valida a quantidade de dígitos
    if (numbers.length !== 14) return false
    
    // Elimina inválidos com todos os dígitos iguais
    const items = [...new Set(numbers)]
    if (items.length === 1) return false
  
    // Cálculo validador
    const calc = (x) => {
      const slice = numbers.slice(0, x)
      let factor = x - 7
      let sum = 0
  
      for (let i = x; i >= 1; i--) {
        const n = slice[x - i]
        sum += n * factor--
        if (factor < 2) factor = 9
      }
  
      const result = 11 - (sum % 11)
  
      return result > 9 ? 0 : result
    }
  
    // Separa os 2 últimos dígitos de verificadores
    const digits = numbers.slice(12)
    
    // Valida 1o. dígito verificador
    const digit0 = calc(12)
    if (digit0 !== digits[0]) return false
  
    // Valida 2o. dígito verificador
    const digit1 = calc(13)
    return digit1 === digits[1]
};