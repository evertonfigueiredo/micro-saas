/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { r2 } from '@/services/cloudflare'
import { auth } from '@/services/auth'

async function uploadFileToS3(file: any, fileName: string) {
  const session = await auth()
  const timestamp = new Date().getTime()
  const nameFile = `${timestamp}-${fileName}`

  const params = {
    Bucket: 'saas',
    Key: `${session?.user?.id}/${nameFile}`,
    Body: file,
    ContentType: 'application/pdf',
  }

  const command = new PutObjectCommand(params)
  try {
    const response = await r2.send(command)

    return {
      status: true,
      nameFile,
      response,
    }
  } catch (error) {
    console.error(error)
    return {
      status: false,
    }
  }
}

export async function uploadFile(formData: any) {
  try {
    const file = formData.get('file')
    const name = formData.get('name')

    if (file.size === 0) {
      return { status: 'error', message: 'Please select a file.' }
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const result = await uploadFileToS3(buffer, name)

    if (result.status) {
      console.log(result)

      const data = {
        status: 'Upload Realizado',
        message: 'Seu E-book foi carregado com sucesso!',
      }
      return data
    } else {
      return {
        status: 'Error ao realizar Upload',
        message:
          'Ocorreu algum error ao realizar upload, tente novamente mais tarde!',
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'Error ao realizar Upload',
      message:
        'Ocorreu algum error ao realizar upload, tente novamente mais tarde!',
    }
  }
}
