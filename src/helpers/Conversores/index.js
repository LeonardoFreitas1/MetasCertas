class Conversores {
    converteWhatsapp(whatsapp){
        return whatsapp.substring(1,3) + whatsapp.substring(5,10) + whatsapp.substring(11,15)
    }
    converteCPF(converte){
        return converte.substring(0,3) + converte.substring(4,7) + converte.substring(8,11) + converte.substring(12,14)
    }
    converteCNPJ(converte){
        return converte.substring(0,2) + converte.substring(3,6) + converte.substring(7,10) + converte.substring(11,15) + converte.substring(16, 18)
    }
}export default Conversores