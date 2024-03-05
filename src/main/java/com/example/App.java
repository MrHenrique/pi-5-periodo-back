package com.example;


import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class App {
    public static void main(String args[]) {
        try {
            Connection conexaoBancoIrriga = DriverManager.getConnection("jdbc:postgresql://localhost:5432/IrrigaFacil", "postgres", "lucas");
            if (conexaoBancoIrriga != null) {
                System.out.println("Conectado com Sucesso");
                Statement stm = conexaoBancoIrriga.createStatement();

                inserirDados(stm);

                boolean autenticado = AutenticacaoUsuario(conexaoBancoIrriga, "testebanco1@teste.com", "senhatestebanco");
                if (autenticado) {
                    System.out.println("Usuário autenticado com sucesso!");
                } else {
                    System.out.println("Usuário ou senha incorretos!");
                }

                consultaDados(stm);

            } else {
                System.out.println("Erro crítico");
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public static void consultaDados(Statement stm) {
        String sql = "select Usuario, Email, Senha_Hash from login";
        try {
            ResultSet result = stm.executeQuery(sql);
            while (result.next()) {
                System.out.println("Usuario: " + result.getInt("Usuario") + " Email: " + result.getString("Email") + "Senha: " + result.getString("Senha_Hash"));
            }
            System.out.println("Consulta de dados realizada com sucesso!");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Erro ao consultar dados");
        }
    }

    public static void inserirDados(Statement stm) {
        String senhaHash = calcularHashSenha("senhatestebanco");

        String sql = "insert into login (Email, Senha_Hash) values (?, ?)";
        try (PreparedStatement statement = stm.getConnection().prepareStatement(sql)) {
            statement.setString(1, "testebanco1@teste.com");
            statement.setString(2, senhaHash);
            statement.executeUpdate();
            System.out.println("Inserção de dados realizada com sucesso!");
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Erro ao inserir dados");
        }
    }

    public static boolean AutenticacaoUsuario(Connection conexao, String Email, String Senha_Hash) {
        String senhaHash = calcularHashSenha(Senha_Hash);

        String sql = "select count(*) from login where Email = ? and Senha_Hash = ?";
        try (PreparedStatement statement = conexao.prepareStatement(sql)) {
            statement.setString(1, Email);
            statement.setString(2, senhaHash);
            try (ResultSet resultSet = statement.executeQuery()) {
                if (resultSet.next()) {
                    int count = resultSet.getInt(1);
                    return count > 0;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("Erro ao autenticar usuário");
        }
        return false;
    }

    public static String calcularHashSenha(String Senha_Hash) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = md.digest(Senha_Hash.getBytes());
            StringBuilder sb = new StringBuilder();
            for (byte b : hashBytes) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
            return null;
        }
    }
}
