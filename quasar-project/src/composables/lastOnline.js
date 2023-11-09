import { formatDistanceToNow } from "date-fns";
import { computed } from 'vue'

export function WhenlastOnline(date) {

    const checkLastOnline = (date) => {
        return formatDistanceToNow(date, { addSuffix: true });
    };

    const lastOnline = computed(() => {
        return checkLastOnline;
    });

    return { lastOnline };
}

// funkcja do aktualizowania ostatniej aktywnosci uzytkownika
// do uzycia w main layout oraz users page