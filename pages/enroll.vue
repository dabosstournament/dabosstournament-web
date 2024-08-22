<template>
    <UContainer class="min-h-[calc(100dvh)] flex flex-col space-y-12 py-12 justify-around">
        <UContainer class="text-center text-3xl md:text-6xl lg:text-8xl flex place-content-center select-none mb-auto">
            <h1>ISCRIVI IL TUO <span class="text-magenta-700">TEAM</span></h1>
        </UContainer>
        <UContainer class="flex flex-col place-content-center">
            <UForm
                v-if="state === State.InsertingPhoneNumber || state === State.WaitingPhoneNumberVerificationCode || state === State.SigningIn"
                size="xl" :schema="phoneNumberSchema" :state="phoneNumberState" class="space-y-4"
                @submit="sendPhoneNumberVerificationCode">
                <UFormGroup help="Ci serve per poter confermare la tua identità" size="xl" label="CELLULLARE"
                    name="phoneNumber">
                    <div class="flex space-x-2">
                        <USelect class="max-w-36" v-model="phoneNumberState.phoneNumberPrefix"
                            :options="phoneNumberPrefixOptions" />
                        <UInput v-model="phoneNumberState.phoneNumber" />
                    </div>
                </UFormGroup>

                <div class="flex place-content-center pt-4">
                    <UButton :loading="isPhoneNumberFormLoading" size="xl" id="sign-in-button"
                        :disabled="isPhoneNumberFormDisabled" type="submit">
                        Invia codice
                    </UButton>
                </div>
            </UForm>

            <UForm v-if="state === State.InsertingTeamInformation || state === State.UploadingTeamInformation" size="xl"
                :schema="teamInformationSchema" :state="teamInformationState" class="space-y-4"
                @submit="sendTeamInformation">
                <UFormGroup required help="Un nome che rimarrà nella storia" size="xl" label="NOME TEAM" name="name">
                    <UInput v-model="teamInformationState.name" />
                </UFormGroup>

                <UFormGroup required help=" " size="xl" label="CATEGORIA" name="category">
                    <USelect v-model="teamInformationState.category" :options="teamInformationCategoryOptions" />
                </UFormGroup>

                <UDivider class="pt-4" label="Player 1" />
                <div class="flex space-x-2">
                    <UFormGroup class="flex-grow" required help="Colui che non delude mai, il capitano della squadra"
                        size="xl" label="NOME E COGNOME" name="player1Name">
                        <UInput v-model="teamInformationState.player1Name" />
                    </UFormGroup>
                    <UFormGroup class="min-w-24" required help=" " size="xl" label="TAGLIA" name="player1Size">
                        <USelect v-model="teamInformationState.player1Size"
                            :options="teamInformationShirtSizeOptions" />
                    </UFormGroup>
                </div>

                <UDivider class="pt-4" label="Player 2" />
                <div class="flex space-x-2">
                    <UFormGroup class="flex-grow" required help="La stella, l'uomo chiave che vi trainerà alla vittoria"
                        size="xl" label="NOME E COGNOME" name="player2Name">
                        <UInput v-model="teamInformationState.player2Name" />
                    </UFormGroup>
                    <UFormGroup class="min-w-24"  required help=" " size="xl" label="TAGLIA" name="player2Size">
                        <USelect v-model="teamInformationState.player2Size"
                            :options="teamInformationShirtSizeOptions" />
                    </UFormGroup>
                </div>

                <UDivider class="pt-4" label="Player 3" />
                <div class="flex space-x-2">
                    <UFormGroup class="flex-grow" required help="Il pivottone posterizzatore, perno della squadra"
                        size="xl" label="NOME E COGNOME" name="player3Name">
                        <UInput v-model="teamInformationState.player3Name" />
                    </UFormGroup>
                    <UFormGroup class="min-w-24"  required help=" " size="xl" label="TAGLIA" name="player3Size">
                        <USelect v-model="teamInformationState.player3Size"
                            :options="teamInformationShirtSizeOptions" />
                    </UFormGroup>
                </div>

                <UDivider class="pt-4" label="Player 4" />
                <div class="flex space-x-2">
                    <UFormGroup class="flex-grow" help="Il grande difensore che polverizzerà le speranze degl'avversari"
                        size="xl" label="NOME E COGNOME" name="player4Name">
                        <UInput v-model="teamInformationState.player4Name" />
                    </UFormGroup>
                    <UFormGroup class="min-w-24" help=" " size="xl" label="TAGLIA" name="player4Size">
                        <USelect v-model="teamInformationState.player4Size"
                            :options="teamInformationShirtSizeOptions" />
                    </UFormGroup>
                </div>

                <div class="flex place-content-center pt-4">
                    <UButton :loading="isTeamInformationFormLoading" size="xl" :disabled="isTeamInformationFormDisabled"
                        type="submit">
                        Iscrivi la squadra
                    </UButton>
                </div>
            </UForm>
        </UContainer>
    </UContainer>

    <UModal class="dark" v-model="isPhoneNumberVerificationModalPresented">
        <UCard>
            <template #header>
                <UContainer class="flex place-content-center">
                    <h1>INSERISCI IL CODICE DI VERIFICA</h1>
                </UContainer>
            </template>
            <UForm size="xl" :schema="phoneNumberSchema" :state="phoneNumberState"
                @submit="verifyPhoneNumberVerificationCode">
                <div class="flex flex-col space-y-4 justify-around">
                    <UFormGroup help="Il codice arriverà a momenti" size="xl" name="phoneNumberVerificationCode"
                        class="mx-auto" :error="phoneNumberVerificationCodeError">
                        <UInput class="mx-auto" size="xl" v-model="phoneNumberVerificationState.verificationCode" />
                    </UFormGroup>

                    <UButton class="mx-auto mt-4" size="xl" :loading="isPhoneNumberValidationCodeFormLoading"
                        type="submit" :disabled="isPhoneNumberValidationCodeFormDisabled">
                        Verifica
                    </UButton>
                </div>
            </UForm>
        </UCard>
    </UModal>

    <UModal class="dark" v-model="isUploadSuccessModalPresented" prevent-close>
        <UCard>
            <template #header>
                <UContainer class="flex place-content-center text-center">
                    <h1>{{ teamInformationState.name }} REGISTRATA CON <span class="text-magenta-700">SUCCESSO</span></h1>
                </UContainer>
            </template>
            <div class="flex flex-col space-y-4 justify-around">
                <UButton class="mx-auto mt-4" size="xl" @click="registerAnotherTeam">
                    REGISTRA UN'ALTRA SQUADRA
                </UButton>
                <ULink class="mx-auto mt-4" to="/" type="button">
                    VAI ALLA HOME
                </ULink>
            </div>
        </UCard>
    </UModal>
</template>

<script setup lang="ts">
import countryCodes from 'assets/data/TelephoneNumberCountryCodes.json'
import { signInWithPhoneNumber, RecaptchaVerifier, type ConfirmationResult } from 'firebase/auth'
import { number, object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

useHead({
  title: 'DABOSS TOURNAMENT - Iscrizione'
})
    
const cellularRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const toast = useToast()

const auth = useFirebaseAuth()!

enum State {
    InsertingPhoneNumber,
    WaitingPhoneNumberVerificationCode,
    InsertingPhoneNumberVerificationCode,
    SigningIn,
    InsertingTeamInformation,
    UploadingTeamInformation,
    ShowingUploadSuccess
}

const state = ref(State.InsertingPhoneNumber)

// MARK: - Step 1: Insert Phone Number

const phoneNumberSchema = object({
    phoneNumber: string().required('Obbligatorio').matches(cellularRegExp, 'Non è valido')
})

type PhoneNumberSchema = InferType<typeof phoneNumberSchema>

const phoneNumberState = reactive({
    phoneNumberPrefix: "+39",
    phoneNumber: undefined
})

const isPhoneNumberFormValid = computed(() => {
    return phoneNumberSchema.isValidSync(phoneNumberState)
})

const isPhoneNumberFormLoading = computed(() => {
    return state.value == State.WaitingPhoneNumberVerificationCode
})

const isPhoneNumberFormDisabled = computed(() => {
    return !isPhoneNumberFormValid.value || isPhoneNumberFormLoading.value
})

const isPhoneNumberVerificationModalPresented = ref(false)

async function sendPhoneNumberVerificationCode() {
    state.value = State.WaitingPhoneNumberVerificationCode
    try {
        const phoneNumber = phoneNumberState.phoneNumberPrefix + phoneNumberState.phoneNumber
        confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier)
        isPhoneNumberVerificationModalPresented.value = true
        state.value = State.InsertingPhoneNumberVerificationCode
    } catch (error: unknown) {
        if (error instanceof Error) {
            // Show error in a toast
            toast.add({ title: "ERRORE: RIPROVA PIÚ TARDI", description: error.message, color: "red" })
            state.value = State.InsertingPhoneNumber
        }
    }
}

// MARK: - Step 2: Insert Phone Number Verification Code

const phoneNumberVerificationSchema = object({
    verificationCode: number()
})

type PhoneNumberVerificationSchema = InferType<typeof phoneNumberVerificationSchema>

const phoneNumberVerificationState = reactive({
    verificationCode: ""
})

const phoneNumberPrefixOptions = countryCodes.map((x) => ({
    label: `${x.flag} ${x.name} ${x.dial_code}`,
    value: x.dial_code
}));

const isPhoneNumberValidationCodeFormValid = computed(() => {
    return phoneNumberVerificationSchema.isValidSync(phoneNumberVerificationState)
})

const isPhoneNumberValidationCodeFormLoading = computed(() => {
    return state.value == State.SigningIn
})

const isPhoneNumberValidationCodeFormDisabled = computed(() => {
    return !isPhoneNumberValidationCodeFormValid.value || isPhoneNumberValidationCodeFormLoading.value
})

let verifier: RecaptchaVerifier


let confirmationResult: ConfirmationResult

let phoneNumberVerificationCodeError = ref('')

async function verifyPhoneNumberVerificationCode(event: FormSubmitEvent<PhoneNumberSchema>) {
    state.value = State.SigningIn
    try {
        await confirmationResult.confirm(phoneNumberVerificationState.verificationCode)
        state.value = State.InsertingTeamInformation
        isPhoneNumberVerificationModalPresented.value = false
    } catch (error: unknown) {
        if (error instanceof Error) {
            phoneNumberVerificationCodeError.value = "Il codice non è valido"
            state.value = State.InsertingPhoneNumberVerificationCode
        }
    }
}

// MARK: - Step 3: Insert Team Information

const teamInformationSchema = object({
    name: string().min(3, "Inserisci un nome valido").max(24, "Inserisci un nome più corto").required('Obbligatorio'),
    category: string().required('Obbligatorio'),
    player1Name: string().min(3, "Inserisci un nome valido").required('Obbligatorio'),
    player2Name: string().min(3, "Inserisci un nome valido").required('Obbligatorio'),
    player3Name: string().min(3, "Inserisci un nome valido").required('Obbligatorio'),
    player4Name: string().min(3, "Inserisci un nome valido").optional(),
    player1Size: string().required('Obbligatorio'),
    player2Size: string().required('Obbligatorio'),
    player3Size: string().required('Obbligatorio'),
    player4Size: string().optional(),
})

type TeamInformationSchema = InferType<typeof teamInformationSchema>

let teamInformationState = reactive({
    name: undefined,
    category: "PRO",
    player1Name: undefined,
    player1Size: "L",
    player2Name: undefined,
    player2Size: "L",
    player3Name: undefined,
    player3Size: "L",
    player4Name: undefined,
    player4Size: undefined
})

const teamInformationCategoryOptions = ['', 'PRO', 'MISTA', 'LADIES', 'U18', 'U15']

const teamInformationShirtSizeOptions = ['', 'S', 'M', 'L', 'XL', 'XXL']

const isTeamInformationFormValid = computed(() => {
    return teamInformationSchema.isValidSync(teamInformationState)
})

const isTeamInformationFormLoading = computed(() => {
    return state.value === State.UploadingTeamInformation
})

const isTeamInformationFormDisabled = computed(() => {
    return !isTeamInformationFormValid.value || isTeamInformationFormLoading.value
})

async function sendTeamInformation(event: FormSubmitEvent<TeamInformationSchema>) {
    state.value = State.UploadingTeamInformation
    try {
        // SAVE IN FIRESTORE
        if (auth.currentUser?.phoneNumber !== null) {
            await addDoc(collection(useFirestore(), "enrollments"), {
                cellular: auth.currentUser?.phoneNumber || null,
                name: teamInformationState.name || null,
                category: teamInformationState.category || null,
                players: [
                    {
                        name: teamInformationState.player1Name || null,
                        size: teamInformationState.player1Size || null
                    },
                    {
                        name: teamInformationState.player2Name || null,
                        size: teamInformationState.player2Size || null
                    },
                    {
                        name: teamInformationState.player3Name || null,
                        size: teamInformationState.player3Size || null
                    },
                    {
                        name: teamInformationState.player4Name || null,
                        size: teamInformationState.player4Size || null
                    }
                ]
            })
        } else {
            throw new Error("Utente non loggato")
        }
        state.value = State.ShowingUploadSuccess
        isUploadSuccessModalPresented.value = true
    } catch (error: unknown) {
        if (error instanceof Error) {
            toast.add({ title: "ERRORE: RIPROVA PIÚ TARDI", description: error.message, color: "red" })
            state.value = State.InsertingTeamInformation
        }
    }
}

// MARK: - Step 4: Show Upload Success Modal

const isUploadSuccessModalPresented = ref(false)

function registerAnotherTeam() {
    teamInformationState = {
        name: teamInformationState.name,
        category: "PRO",
        player1Name: undefined,
        player1Size: "L",
        player2Name: undefined,
        player2Size: "L",
        player3Name: undefined,
        player3Size: "L",
        player4Name: undefined,
        player4Size: undefined
    }

    state.value = State.InsertingTeamInformation

    isUploadSuccessModalPresented.value = false
} 



onMounted(() => {
    verifier = new RecaptchaVerifier(auth, 'sign-in-button', {
        size: 'invisible',
        callback: () => {
            sendPhoneNumberVerificationCode();
        }
    });
})

watch(phoneNumberVerificationState, async () => { phoneNumberVerificationCodeError.value = '' })

watch(isPhoneNumberVerificationModalPresented, async (_, newValue) => {
    if ((state.value === State.InsertingPhoneNumberVerificationCode || state.value === State.SigningIn) && newValue === false) {
        state.value = State.InsertingPhoneNumber
    }
})
</script>
