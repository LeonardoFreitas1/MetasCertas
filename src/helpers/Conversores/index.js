class Conversores {
    converteWhatsapp(whatsapp){
        return whatsapp.substring(1,3) + whatsapp.substring(5,10) + whatsapp.substring(11,15)
    }
    converteCPF(converte){
        return converte.substring(0,3) + converte.substring(4,7) + converte.substring(8,11) + converte.substring(12,14)
    }
}export default Conversores