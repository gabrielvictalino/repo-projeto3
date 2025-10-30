import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.swing.border.LineBorder;
import java.awt.*;
import java.awt.event.*;
import java.util.HashMap;
import java.util.Map;

public class Login {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> new TelaLogin(new AuthService()).setVisible(true));
    }
}

enum Role { ADMIN, USUARIO }

class User {
    private final String username;
    private final String password;
    private final Role role;
    public User(String u, String p, Role r){ this.username=u; this.password=p; this.role=r; }
    public String getUsername(){ return username; }
    public String getPassword(){ return password; }
    public Role getRole(){ return role; }
}

class AuthService {
    private final Map<String, User> users = new HashMap<>();
    public AuthService(){
        add(new User("admin","1234",Role.ADMIN));
        add(new User("julia","abcd",Role.USUARIO));
    }
    private void add(User u){ users.put(u.getUsername().toLowerCase(), u); }
    public synchronized User authenticate(String username, char[] password, Role selectedRole){
        if (username == null) return null;
        User u = users.get(username.toLowerCase());
        boolean ok = u != null && String.valueOf(password).equals(u.getPassword()) && u.getRole() == selectedRole;
        return ok ? u : null;
    }
    public synchronized boolean exists(String username){
        return username != null && users.containsKey(username.toLowerCase());
    }
    public synchronized boolean create(String username, String password, Role role){
        if (username == null || username.isBlank() || password == null || password.isBlank() || role == null) return false;
        if (exists(username)) return false;
        add(new User(username, password, role));
        return true;
    }
}

class GradientHeader extends JPanel {
    private final Color navy = new Color(22, 46, 80);
    private final Color tiffany = new Color(95, 206, 211);
    public GradientHeader(){ setPreferredSize(new Dimension(100, 80)); setOpaque(false); }
    @Override protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setPaint(new GradientPaint(0, 0, navy, getWidth(), getHeight(), tiffany));
        g2.fillRect(0, 0, getWidth(), getHeight());
        g2.dispose();
    }
}
class RoundedPanel extends JPanel {
    private final int arc;
    public RoundedPanel(int arc){ this.arc = arc; setOpaque(false); }
    @Override protected void paintComponent(Graphics g) {
        Graphics2D g2 = (Graphics2D) g.create();
        g2.setColor(new Color(0,0,0,25));
        g2.fillRoundRect(3, 4, getWidth()-6, getHeight()-6, arc, arc);
        g2.setColor(getBackground());
        g2.fillRoundRect(0, 0, getWidth(), getHeight(), arc, arc);
        g2.dispose();
        super.paintComponent(g);
    }
}
class AccentButton extends JButton {
    public AccentButton(String text, Color navy, Color tiffany){
        super(text);
        setFocusPainted(false);
        setForeground(Color.WHITE);
        setBackground(navy);
        setBorder(new EmptyBorder(10,16,10,16));
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        addMouseListener(new MouseAdapter() {
            @Override public void mouseEntered(MouseEvent e){ setBackground(tiffany); setForeground(Color.BLACK); }
            @Override public void mouseExited (MouseEvent e){ setBackground(navy); setForeground(Color.WHITE); }
        });
    }
}
class LinkButton extends JButton {
    public LinkButton(String text, Color color){
        super(text);
        setBorder(null);
        setContentAreaFilled(false);
        setFocusPainted(false);
        setForeground(color);
        setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
        setHorizontalAlignment(SwingConstants.LEFT);
        setFont(getFont().deriveFont(Font.PLAIN, 12f));
    }
}

class TelaLogin extends JFrame {
    private final Color navy = new Color(22, 46, 80);
    private final Color tiffany = new Color(95, 206, 211);
    private final Color bgSoft = new Color(232, 248, 248);

    private final AuthService authService;
    private final JTextField txtUser = new JTextField();
    private final JPasswordField txtPass = new JPasswordField();
    private final JComboBox<Role> cbRole = new JComboBox<>(Role.values());
    private final JCheckBox cbVer = new JCheckBox("mostrar senha");
    private final AccentButton btnEntrar = new AccentButton("Entrar", new Color(22,46,80), new Color(95,206,211));
    private final JButton btnSair = new JButton("Sair");
    private final LinkButton btnEsqueci = new LinkButton("Esqueci minha senha", new Color(22,46,80));
    private final LinkButton btnCriarConta = new LinkButton("Criar conta", new Color(22,46,80));
    private final RoundedPanel card = new RoundedPanel(14);

    public TelaLogin(AuthService authService){
        this.authService = authService;
        setTitle("Login");
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(540, 380);
        setLocationRelativeTo(null);
        setResizable(false);

        JPanel root = new JPanel(new BorderLayout());
        GradientHeader header = new GradientHeader();
        JLabel titulo = new JLabel("Acesso ao Sistema", SwingConstants.CENTER);
        titulo.setForeground(Color.WHITE);
        titulo.setFont(new Font("SansSerif", Font.BOLD, 18));
        header.setLayout(new BorderLayout());
        header.add(titulo, BorderLayout.CENTER);

        txtUser.setFont(new Font("SansSerif", Font.PLAIN, 14));
        txtPass.setFont(new Font("SansSerif", Font.PLAIN, 14));
        txtUser.setPreferredSize(new Dimension(220, 34));
        txtPass.setPreferredSize(new Dimension(220, 34));
        txtUser.setBorder(new LineBorder(new Color(190,190,200), 1, true));
        txtPass.setBorder(new LineBorder(new Color(190,190,200), 1, true));

        card.setBackground(Color.WHITE);
        card.setBorder(new EmptyBorder(16,16,12,16));

        JPanel form = new JPanel(new GridBagLayout());
        GridBagConstraints g = new GridBagConstraints();
        g.insets = new Insets(8,8,8,8);
        g.fill = GridBagConstraints.HORIZONTAL;

        g.gridx=0; g.gridy=0; form.add(new JLabel("Usuário"), g);
        g.gridx=1; g.gridy=0; form.add(txtUser, g);

        g.gridx=0; g.gridy=1; form.add(new JLabel("Senha"), g);
        g.gridx=1; g.gridy=1; form.add(txtPass, g);

        JPanel underPass = new JPanel(new BorderLayout());
        underPass.setOpaque(false);
        cbVer.addActionListener(e -> txtPass.setEchoChar(cbVer.isSelected() ? 0 : '\u2022'));
        cbVer.setFont(new Font("SansSerif", Font.PLAIN, 12));
        underPass.add(btnEsqueci, BorderLayout.WEST);
        underPass.add(cbVer, BorderLayout.EAST);

        g.gridx=1; g.gridy=2; form.add(underPass, g);

        g.gridx=0; g.gridy=3; form.add(new JLabel("Perfil"), g);
        g.gridx=1; g.gridy=3; form.add(cbRole, g);

        JPanel links = new JPanel(new FlowLayout(FlowLayout.LEFT, 0, 0));
        links.setOpaque(false);
        links.add(btnCriarConta);
        g.gridx=1; g.gridy=4; form.add(links, g);

        JPanel botoes = new JPanel(new FlowLayout(FlowLayout.RIGHT,8,0));
        estilizarSecundario(btnSair);
        botoes.add(btnSair);
        botoes.add(btnEntrar);

        card.setLayout(new BorderLayout(8,8));
        card.add(form, BorderLayout.CENTER);
        card.add(botoes, BorderLayout.SOUTH);

        JPanel center = new JPanel(null){
            @Override public void doLayout(){
                int w = 400, h = 250;
                int x = (getWidth()-w)/2;
                int y = (getHeight()-h)/2;
                card.setBounds(x,y,w,h);
            }
        };
        center.setBackground(bgSoft);
        center.add(card);

        root.add(header, BorderLayout.NORTH);
        root.add(center, BorderLayout.CENTER);
        setContentPane(root);

        btnEntrar.addActionListener(this::login);
        btnSair.addActionListener(e -> System.exit(0));
        btnEsqueci.addActionListener(e -> JOptionPane.showMessageDialog(this,"Recuperação de senha..."));
        btnCriarConta.addActionListener(e -> abrirCadastro());
        getRootPane().setDefaultButton(btnEntrar);

        KeyAdapter enter = new KeyAdapter(){ @Override public void keyPressed(KeyEvent e){ if(e.getKeyCode()==KeyEvent.VK_ENTER) btnEntrar.doClick(); } };
        txtUser.addKeyListener(enter);
        txtPass.addKeyListener(enter);
        cbRole.addKeyListener(enter);
    }

    private void estilizarSecundario(JButton b){
        b.setFocusPainted(false);
        b.setBackground(new Color(245,247,250));
        b.setBorder(new EmptyBorder(8,14,8,14));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
    }

    private void login(ActionEvent e){
        String user = txtUser.getText().trim();
        char[] pass = txtPass.getPassword();
        Role role = (Role) cbRole.getSelectedItem();
        User u = authService.authenticate(user, pass, role);

        if(u != null){
            this.dispose();

            if (u.getRole() == Role.ADMIN) {
                new TelaAdmin(u).setVisible(true);
            } else if (u.getRole() == Role.USUARIO) {
                new TelaUsuario(u).setVisible(true);
            }

        } else {
            JOptionPane.showMessageDialog(this,"Credenciais/Perfil inválidos.","Erro",JOptionPane.ERROR_MESSAGE);
        }
    }

    private void abrirCadastro(){
        DialogCadastro dlg = new DialogCadastro(this, authService);
        dlg.setVisible(true);
        String novoUser = dlg.getUltimoUsuarioCriado();
        if (novoUser != null) {
            txtUser.setText(novoUser);
            txtPass.setText("");
            cbRole.setSelectedItem(Role.USUARIO);
            txtPass.requestFocusInWindow();
        }
    }
}

class DialogCadastro extends JDialog {
    private final Color navy = new Color(22, 46, 80);
    private final Color tiffany = new Color(95, 206, 211);
    private final Color bgSoft = new Color(232, 248, 248);
    private final AuthService authService;
    private String ultimoUsuarioCriado;

    private final JTextField txtUser = new JTextField();
    private final JPasswordField txtPass = new JPasswordField();
    private final JComboBox<Role> cbRole = new JComboBox<>(Role.values());

    public DialogCadastro(JFrame owner, AuthService authService) {
        super(owner, "Criar conta", true);
        this.authService = authService;

        setSize(520, 360);
        setLocationRelativeTo(owner);
        setResizable(false);

        JPanel root = new JPanel(new BorderLayout());

        GradientHeader header = new GradientHeader();
        JLabel titulo = new JLabel("Criar Conta", SwingConstants.CENTER);
        titulo.setForeground(Color.WHITE);
        titulo.setFont(new Font("SansSerif", Font.BOLD, 18));
        header.setLayout(new BorderLayout());
        header.add(titulo, BorderLayout.CENTER);

        RoundedPanel card = new RoundedPanel(14);
        card.setBackground(Color.WHITE);
        card.setBorder(new EmptyBorder(16,16,12,16));

        JPanel form = new JPanel(new GridBagLayout());
        GridBagConstraints g = new GridBagConstraints();
        g.insets = new Insets(8,8,8,8);
        g.fill = GridBagConstraints.HORIZONTAL;

        txtUser.setPreferredSize(new Dimension(220, 34));
        txtPass.setPreferredSize(new Dimension(220, 34));
        txtUser.setFont(new Font("SansSerif", Font.PLAIN, 14));
        txtPass.setFont(new Font("SansSerif", Font.PLAIN, 14));
        txtUser.setBorder(new LineBorder(new Color(190,190,200), 1, true));
        txtPass.setBorder(new LineBorder(new Color(190,190,200), 1, true));

        g.gridx=0; g.gridy=0; form.add(new JLabel("Usuário"), g);
        g.gridx=1; g.gridy=0; form.add(txtUser, g);

        g.gridx=0; g.gridy=1; form.add(new JLabel("Senha"), g);
        g.gridx=1; g.gridy=1; form.add(txtPass, g);

        g.gridx=0; g.gridy=2; form.add(new JLabel("Perfil"), g);
        g.gridx=1; g.gridy=2; form.add(cbRole, g);

        JPanel botoes = new JPanel(new FlowLayout(FlowLayout.RIGHT, 8, 0));
        JButton btnCancelar = new JButton("Cancelar");
        estilizarSecundario(btnCancelar);
        AccentButton btnCriar = new AccentButton("Criar", navy, tiffany);
        btnCancelar.addActionListener(e -> dispose());
        btnCriar.addActionListener(e -> criarConta());
        botoes.add(btnCancelar);
        botoes.add(btnCriar);

        card.setLayout(new BorderLayout(8,8));
        card.add(form, BorderLayout.CENTER);
        card.add(botoes, BorderLayout.SOUTH);

        JPanel center = new JPanel(null){
            @Override public void doLayout(){
                int w = 400, h = 220;
                int x = (getWidth()-w)/2;
                int y = (getHeight()-h)/2;
                card.setBounds(x,y,w,h);
            }
        };
        center.setBackground(bgSoft);
        center.add(card);

        root.add(header, BorderLayout.NORTH);
        root.add(center, BorderLayout.CENTER);
        setContentPane(root);

        getRootPane().setDefaultButton(btnCriar);
        txtUser.requestFocusInWindow();
        KeyAdapter enter = new KeyAdapter(){ @Override public void keyPressed(KeyEvent e){ if(e.getKeyCode()==KeyEvent.VK_ENTER) btnCriar.doClick(); } };
        txtUser.addKeyListener(enter);
        txtPass.addKeyListener(enter);
        cbRole.addKeyListener(enter);
    }

    private void estilizarSecundario(JButton b){
        b.setFocusPainted(false);
        b.setBackground(new Color(245,247,250));
        b.setBorder(new EmptyBorder(8,14,8,14));
        b.setCursor(Cursor.getPredefinedCursor(Cursor.HAND_CURSOR));
    }

    private void criarConta(){
        String u = txtUser.getText().trim();
        String p = new String(txtPass.getPassword());
        Role r = (Role) cbRole.getSelectedItem();

        if (u.isBlank() || p.isBlank()){
            JOptionPane.showMessageDialog(this, "Preencha usuário e senha.", "Atenção", JOptionPane.WARNING_MESSAGE);
            return;
        }
        if (authService.exists(u)){
            JOptionPane.showMessageDialog(this, "Usuário já existe.", "Atenção", JOptionPane.WARNING_MESSAGE);
            return;
        }
        boolean ok = authService.create(u, p, r);
        if (ok){
            JOptionPane.showMessageDialog(this, "Conta criada com sucesso!");
            ultimoUsuarioCriado = u;
            dispose();
        } else {
            JOptionPane.showMessageDialog(this, "Não foi possível criar a conta.", "Erro", JOptionPane.ERROR_MESSAGE);
        }
    }

    public String getUltimoUsuarioCriado(){ return ultimoUsuarioCriado; }
}
class TelaAdmin extends JFrame {
    public TelaAdmin(User user) {
        super("Admin - " + user.getUsername());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(600, 380);
        setLocationRelativeTo(null);

        JMenuBar menuBar = new JMenuBar();

        JMenu menuUsuarios = new JMenu("Usuários");
        JMenuItem miListar = new JMenuItem("Listar");
        JMenuItem miRemover = new JMenuItem("Remover");
        menuUsuarios.add(miListar);
        menuUsuarios.add(miRemover);

        JMenu menuSistema = new JMenu("Sistema");
        JMenuItem miSair = new JMenuItem("Sair");
        menuSistema.add(miSair);

        menuBar.add(menuUsuarios);
        menuBar.add(Box.createHorizontalGlue());
        menuBar.add(menuSistema);
        setJMenuBar(menuBar);

        JLabel lbl = new JLabel("Painel do Administrador", SwingConstants.CENTER);
        lbl.setFont(new Font("SansSerif", Font.BOLD, 18));

        setLayout(new BorderLayout());
        add(lbl, BorderLayout.CENTER);

        miListar.addActionListener(e ->
                JOptionPane.showMessageDialog(this, "Listar usuários (implemente com tabela)."));
        miRemover.addActionListener(e ->
                JOptionPane.showMessageDialog(this, "Remover usuário (implemente busca e remoção)."));
        miSair.addActionListener(e -> dispose());
    }
}


class TelaUsuario extends JFrame {
    public TelaUsuario(User user) {
        super("Painel do Usuário Comum - " + user.getUsername());
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(550, 350);
        setLocationRelativeTo(null);

        JMenuBar menuBar = new JMenuBar();

        JMenu menuPrincipal = new JMenu("Menu");
        JMenu menuSair = new JMenu("Sair"); // Adicionando "Sair" como aba principal por simplicidade

        JMenuItem itemFeedback = new JMenuItem("Feedback");
        JMenuItem itemQuestionarios = new JMenuItem("Questionários");
        JMenuItem itemLogout = new JMenuItem("Sair do Sistema");

        itemFeedback.addActionListener(e -> JOptionPane.showMessageDialog(this, "A funcionalidade de Feedback está em desenvolvimento.", "Informação", JOptionPane.INFORMATION_MESSAGE));
        itemQuestionarios.addActionListener(e -> JOptionPane.showMessageDialog(this, "A funcionalidade de Questionários está em desenvolvimento.", "Informação", JOptionPane.INFORMATION_MESSAGE));

        itemLogout.addActionListener(e -> this.dispose());
        menuSair.addMouseListener(new MouseAdapter() {
            @Override
            public void mouseClicked(MouseEvent e) {
                if (e.getButton() == MouseEvent.BUTTON1) {
                    dispose();
                }
            }
        });

        menuPrincipal.add(itemFeedback);
        menuPrincipal.add(itemQuestionarios);

        menuBar.add(menuPrincipal);
        menuBar.add(Box.createHorizontalGlue()); // Empurra o menu 'Sair' para a direita (opcional)
        menuBar.add(menuSair);

        setJMenuBar(menuBar);

        JLabel welcomeLabel = new JLabel("Bem-vindo(a), Usuário(a) " + user.getUsername() + "!", SwingConstants.CENTER);
        welcomeLabel.setFont(new Font("SansSerif", Font.PLAIN, 18));

        JButton btnSair = new JButton("Sair");
        btnSair.addActionListener(e -> this.dispose());

        JPanel panel = new JPanel(new BorderLayout(10, 10));
        panel.setBorder(BorderFactory.createEmptyBorder(20, 20, 20, 20));
        panel.add(welcomeLabel, BorderLayout.CENTER);
        panel.add(btnSair, BorderLayout.SOUTH);

        setContentPane(panel);
    }
}